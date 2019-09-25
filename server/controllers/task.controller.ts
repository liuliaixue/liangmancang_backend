import Joi from 'joi';
import Task, { Status, ITask, StatusList } from '../models/task.model';
import ruleCtrl from './rule.controller';
import { IRule } from '../models/rule.model';
import BillRecord, {
  IBillRecord,
  Status as BillRecordStatus,
  Type as BillRecordType
} from '../models/billRecord.model';
import Bill from '../models/bill.model';
import User from '../models/user.model';
import Err from '../tools/error';

const taskSchema = Joi.object({
  parent: Joi.string(),
  orderNumber: Joi.string(),

  goodsName: Joi.string(),
  goodsLink: Joi.string(),
  goodsImage: Joi.string(),
  goodsPrice: Joi.number(),
  goodsTotal: Joi.number(),
  goodsPriceShowed: Joi.number(),
  goodsSpecification: Joi.string(),
  isFreeShipping: Joi.bool(),

  howToFindGoods: Joi.string(),

  startTime: Joi.number(),
  endTime: Joi.number(),
  total: Joi.number(),

  commission: Joi.number(),
  platformServiceFee: Joi.number(),
  platformCommission: Joi.number(),

  extraCommission: Joi.number(),
  extraImages: Joi.array(),
  remark: Joi.string(),

  storeid: Joi.string(),
  userid: Joi.string(),
  workerid: Joi.string(),

  // # 0 default, 1  being assigned to worker, 2 in appeal 3 finished
  status: Joi.string(),

  createdAt: Joi.number(),
  updatedAt: Joi.number()
});

const newTask = async (task: ITask) => {
  task = await Joi.validate(task, taskSchema, { abortEarly: false });
  const now = new Date();
  if (task.startTime < task.endTime) {
  } else {
    throw new Error(
      `invalid startTime=${task.startTime} and endTime=${task.endTime}`
    );
  }

  // check rule
  const rule = await ruleCtrl.getCurrentRule();
  if (!rule) {
    throw Err.NotFound(`rule  not found`);
  }
  if (
    !Number.isInteger(task.total) ||
    !Number.isInteger(task.extraCommission)
  ) {
    throw Err.IllegalValue(
      `total=${task.total}, extraCommission=${task.extraCommission}`
    );
  }

  const amount = ruleCtrl.gerCurrentRuleAmount(rule) + task.extraCommission;
  if (!Number.isInteger(amount)) {
    throw new Error('server error');
  }
  const totalAmount = amount * task.total;

  const user = await User.findById(task.userid);
  if (!user) {
    throw new Error(`invalid userid ${task.userid}`);
  }
  const bill = await Bill.findById(user.billid);
  if (!bill) {
    throw new Error('user bill info not found');
  }
  if (bill.remained < totalAmount) {
    throw new Error('余额不足');
  }

  // lock bill and add billRecord
  const updatedBill = await Bill.findByIdAndUpdate(
    bill._id,
    {
      $set: {
        remained: bill.remained - totalAmount,
        freeze: bill.freeze + totalAmount,
        updatedAt: now.getTime()
      }
    },
    { new: true }
  );
  const lockRecordObj = {
    userid: task.userid,
    amount: totalAmount,
    type: BillRecordType.TASK_LOCK,
    status: BillRecordStatus.DEFAULT,
    createdAt: now.getTime(),
    updatedAt: now.getTime()
  };
  const lockTaskBillRecord = await new BillRecord(lockRecordObj).save();

  task.createdAt = now.getTime();
  task.updatedAt = now.getTime();
  task.status = Status.DEFAULT;
  task.amount = totalAmount;

  const newTask = await new Task(task).save();
  // child tasks
  const childTasks = [];
  const firstChildStartAt = task.startTime;
  const duration = task.endTime - task.startTime;
  for (let i = 0; i < task.total; i++) {
    childTasks.push({
      ...task,
      parent: newTask.id,
      childStartAt: firstChildStartAt + (duration / task.total) * i,
      status: Status.DEFAULT,
      amount
    });
  }
  const createChildTasks = childTasks.map(async ct => {
    const t = await new Task(ct).save();
    return t;
  });
  await Promise.all(createChildTasks);
  // child tasks finished
  return newTask;
};

export interface ITaskQuery {
  skip: number;
  limit: number;
  userid?: string;
  parent?: string;
  status?: Status;
  workerid?: string;
}
export interface ItaskFilter {
  userid?: string;
  parent?: string;
  status?: Status;
  workerid?: string;
}
const findById = async (_id: string) => {
  const check = await Task.findById(_id);
  if (!check) {
    throw new Error(`invalid _id`);
  }
  return check;
};
const find = async (query: ITaskQuery = { skip: 0, limit: 10 }) => {
  const { skip, limit, userid, parent, status } = query;
  const filter: ItaskFilter = {};
  if (userid) {
    filter.userid = userid;
  }
  if (parent) {
    filter.parent = parent;
  }
  if (status) {
    filter.status = status;
  }

  const list = await Task.find(filter)
    .skip(skip)
    .limit(limit);
  const total = await Task.count(filter);

  return { list, total };
};

const findChildTaskList = async (query: ITaskQuery) => {
  const { skip, limit } = query;

  const filter: ItaskFilter = {
    status: query.status,
    workerid: query.workerid
  };

  const list = await Task.find(filter)
    .skip(skip)
    .limit(limit);
  const total = await Task.count(filter);

  return { list, total };
};

const updateInfo = async (_id: string, updateObj: ITask) => {
  const now = new Date();
  const check = await Task.findByIdAndUpdate(
    _id,
    {
      $set: {
        ...updateObj,
        updatedAt: now.getTime()
      }
    },
    { new: true }
  );

  if (!check) {
    throw new Error('incorrect _id');
  }

  return check;
};

const updateStatus = async (_id: string, status: Status) => {
  const now = new Date();
  const check = await Task.findByIdAndUpdate(
    _id,
    {
      $set: {
        status,
        updatedAt: now.getTime()
      }
    },
    { new: true }
  );

  if (!check) {
    throw new Error('incorrect _id');
  }

  return check;
};

const updateWorker = async (_id: string, workerid: string) => {
  const now = new Date();
  const check = await Task.findByIdAndUpdate(
    _id,
    {
      $set: {
        workerid,
        status: Status.ASSIGNED,
        updatedAt: now.getTime()
      }
    },
    { new: true }
  );

  if (!check) {
    throw new Error('incorrect _id');
  }

  return check;
};

const finish = async (_id: string) => {
  const check = await Task.findById(_id);
  if (!check) {
    throw new Error('incorrect _id');
  }
  if (check.status !== Status.ASSIGNED && check.status !== Status.APPEAL) {
    throw new Error(
      `only ASSIGNED and APPEAL can be finished, task status is ${check.status}`
    );
  }
  if (!check.workerid) {
    throw new Error(`no worker, please use ABORT`);
  }

  const now = new Date();
  const updatedTask = await Task.findByIdAndUpdate(
    _id,
    {
      $set: {
        status: Status.FINISHED,
        updatedAt: now.getTime()
      }
    },
    { new: true }
  );
  if (!updatedTask) {
    throw new Error(`task not found`);
  }

  // return updatedTask;

  // bill info
  const amount = updatedTask.amount;
  const worker = await User.findById(check.workerid);
  if (!worker) {
    throw new Error('user not found');
  }
  const updatedBillBuyer = await Bill.findByIdAndUpdate(worker.billid, {
    $inc: {
      remained: amount,
      total: amount
    },
    updatedAt: now.getTime()
  });
  const updatedBillStore = await Bill.findByIdAndUpdate(check.userid, {
    $inc: {
      freeze: -amount
    },
    updatedAt: now.getTime()
  });
  const billRecordBuyer = {
    userid: worker.id,
    amount: amount,
    type: BillRecordType.TASK_PAYMENT,
    status: BillRecordStatus.CHECKED,
    createdAt: now.getTime(),
    updatedAt: now.getTime()
  };
  const billRecord = await new BillRecord(billRecordBuyer).save();
  // bill info finished

  return updatedTask;
};

const abort = async (_id: string) => {
  const check = await Task.findById(_id);
  if (!check) {
    throw new Error('incorrect _id');
  }
  if (check.status === Status.FINISHED) {
    throw new Error('incorrent task status');
  }

  const now = new Date();
  const updatedTask = await Task.findByIdAndUpdate(
    _id,
    {
      $set: {
        status: Status.ABORT,
        updatedAt: now.getTime()
      }
    },
    { new: true }
  );
  if (!updatedTask) {
    throw new Error(`task not found`);
  }

  // return updatedTask;

  // bill info
  const amount = updatedTask.amount;
  const updatedBillStore = await Bill.findByIdAndUpdate(check.userid, {
    $inc: {
      total: amount,
      remained: amount,
      freeze: -amount
    },
    updatedAt: now.getTime()
  });
  const billRecordObj = {
    userid: check.userid,
    amount: amount,
    type: BillRecordType.TASK_REFUNK,
    status: BillRecordStatus.CHECKED,
    createdAt: now.getTime(),
    updatedAt: now.getTime()
  };
  const billRecordStore = await new BillRecord(billRecordObj).save();
  // bill info finished
  return updatedTask;
};

const abortFinishedTask = async () => {};
export default {
  newTask,
  find,
  findChildTaskList,
  // findOne,
  findById,
  updateInfo,
  updateStatus,
  updateWorker,
  finish,
  abort
};
