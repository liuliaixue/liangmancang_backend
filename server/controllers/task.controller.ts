import Joi from 'joi';
import Task, { Status, ITask, IOrderInput } from '../models/task.model';
import Order, { Status as OrderStatus, IOrder } from '../models/order.model';
import ruleCtrl from './rule.controller';
import { IRule } from '../models/rule.model';
import Bill, {
  IBill,
  Status as BillStatus,
  Type as BillType
} from '../models/bill.model';
import User from '../models/user.model';
import Err from '../tools/error';
import billCtrl from './bill.controller';
import Store from '../models/store.model';

const taskSchema = Joi.object({
  platform: Joi.string(),
  type: Joi.string(),

  goodsName: Joi.string(),
  goodsLink: Joi.string(),
  goodsImage: Joi.string(),
  goodsPrice: Joi.number(),
  goodsTotal: Joi.number(),
  goodsPriceShowed: Joi.number(),
  goodsSpecification: Joi.string(),
  isFreeShipping: Joi.bool(),

  search_sort: Joi.any(),
  search_ReceiverNum: Joi.any(),
  search_price_from: Joi.any(),
  search_price_to: Joi.any(),
  search_where: Joi.any(),
  search_keyword: Joi.any(),

  orders: Joi.array(),

  startTime: Joi.number(),
  endTime: Joi.number(),
  orderQuantity: Joi.number(),

  extraCommission: Joi.number(),
  extraImages: Joi.array(),

  remark: Joi.string().min(0),
  storeid: Joi.string(),
  userid: Joi.string(),

  status: Joi.string()
});

function genOrderList(task: ITask) {
  const orders = task.orders;
  let orderStartAt = task.startTime;
  const duration = task.endTime - task.startTime;

  let orderList = [];
  const now = new Date();
  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];
    const {
      type,

      buyTimes,
      browseTimes,
      collectTimes
      // collect,

      // searchKeyword,
      // goodsSpecification,

      // comment,
      // pictures,
      // remark,
    } = order;
    for (let i = 0; i < buyTimes; i++) {
      orderList.push({
        ...order,
        buyTimes: 1,
        browseTimes: 0,
        collectTimes: 0,
        taskid: task.id,
        startAt: 0,
        status: OrderStatus.DEFAULT,
        userid: task.userid,
        createdAt: now.getTime(),
        updatedAt: now.getTime()
      });
    }
    for (let i = 0; i < browseTimes; i++) {
      orderList.push({
        ...order,
        buyTimes: 0,
        browseTimes: 1,
        collectTimes: collectTimes > i ? 1 : 0,
        taskid: task.id,
        startAt: 0,
        status: OrderStatus.DEFAULT,
        userid: task.userid,
        createdAt: now.getTime(),
        updatedAt: now.getTime()
      });
    }
  }
  for (let i = 0; i < orderList.length; i++) {
    orderList[i].startAt = orderStartAt + (duration / orderList.length) * i;
  }

  return orderList;
}

const newTask = async (task: ITask) => {
  task = await Joi.validate(task, taskSchema, { abortEarly: false });
  const now = new Date();
  // check time
  if (task.startTime < task.endTime) {
  } else {
    throw new Error(
      `invalid startTime=${task.startTime} and endTime=${task.endTime}`
    );
  }

  //todo storeid check

  // check rule
  const rule = await ruleCtrl.getCurrentRule();
  if (!rule) {
    throw Err.NotFound(`rule  not found`);
  }
  if (!Number.isInteger(task.extraCommission)) {
    throw Err.IllegalValue(`extraCommission=${task.extraCommission}`);
  }

  const { allCommission, allDeposit } = ruleCtrl.gerCurrentTaskAmount(task);
  const totalAmount = allCommission + allDeposit;
  if (!Number.isInteger(totalAmount)) {
    throw new Error('server error');
  }

  const user = await User.findById(task.userid);
  if (!user) {
    throw new Error(`invalid userid ${task.userid}`);
  }

  // 1. 创建任务,状态默认
  // 1.1. 创建任务,状态已确认
  // 3. 创建任务,并创建订单

  // task auto check
  if (!user.isTaskAutoCheck) {
    task.createdAt = now.getTime();
    task.updatedAt = now.getTime();
    task.amount = totalAmount;
    const newTask = await new Task(task).save();
    return newTask;
  } else {
    const bill = await billCtrl.findUserLastestBill(user._id);
    if (!bill) {
      throw new Error('user bill info not found');
    }
    if (bill.remained < totalAmount) {
      throw new Error('余额不足');
    }

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
      type: BillType.TASK_LOCK,
      status: BillStatus.DEFAULT,
      createdAt: now.getTime(),
      updatedAt: now.getTime()
    };
    const lockTaskBill = await new Bill(lockRecordObj).save();

    task.createdAt = now.getTime();
    task.updatedAt = now.getTime();
    task.status = Status.AUTO_CHECKED;
    task.amount = totalAmount;

    const newTask = await new Task(task).save();
    const orders = genOrderList(newTask);
    const createOrders = orders.map(async co => {
      const o = await new Task(co).save();
      return o;
    });
    await Promise.all(createOrders);
    // child tasks finished
    return newTask;
  }
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
  const { skip, limit, userid, status } = query;

  const filter = { userid, status };
  if (!filter.userid) delete filter.userid;
  if (!filter.status) delete filter.status;

  const list = await Task.find(filter)
    .skip(skip)
    .limit(limit);
  const total = await Task.count(filter);

  return { list, total };
};

const findWithStore = async (query: ITaskQuery = { skip: 0, limit: 10 }) => {
  const { skip, limit, userid, status } = query;
  const filter = { userid, status };
  if (!filter.userid) delete filter.userid;
  if (!filter.status) delete filter.status;

  let list = await Task.find(filter)
    .skip(skip)
    .limit(limit);
  const promises = list.map(async _task => {
    const store = await Store.findById(_task.storeid);
    // _task.store= store
    (_task as any).store = store;
    return _task;
    // return { ..._task, store };
  });
  let listWithStore = await Promise.all(promises);

  const total = await Task.count(filter);

  return { list: listWithStore, total };
};

const updateInfo = async (_id: string, updateObj: ITask) => {
  const task = await Joi.validate(updateObj, taskSchema, { abortEarly: false });
  const now = new Date();
  if (task.startTime < task.endTime) {
  } else {
    throw new Error(
      `invalid startTime=${task.startTime} and endTime=${task.endTime}`
    );
  }
  task.total = task.orders.length;
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

  const { allCommission, allDeposit } = ruleCtrl.gerCurrentTaskAmount(task);
  const totalAmount = allCommission + allDeposit;
  if (!Number.isInteger(totalAmount)) {
    throw new Error('server error');
  }

  const user = await User.findById(task.userid);
  if (!user) {
    throw new Error(`invalid userid ${task.userid}`);
  }

  const check = await Task.findByIdAndUpdate(
    _id,
    {
      $set: {
        ...updateObj,
        amount: totalAmount,
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

const check = async (_id: string, operator?: string) => {
  const now = new Date();
  const task = await Task.findById(_id);
  if (!task) {
    throw new Error('incorrect _id');
  }
  if (task.status === Status.CHECKED) {
    throw new Error('already checked');
  }
  const totalAmount = task.amount;
  const user = await User.findById(task.userid);
  if (!user) {
    throw new Error('user info not found');
  }
  const bill = await billCtrl.findUserLastestBill(user._id);
  if (!bill) {
    throw new Error('user bill info not found');
  }
  if (bill.remained < totalAmount) {
    throw new Error('余额不足');
  }
  const { total, remained, freeze, withdraw } = bill;
  const lockBillObj = {
    userid: task.userid,
    amount: totalAmount,
    type: BillType.TASK_LOCK,
    total: bill.total - totalAmount,
    remained: bill.remained - totalAmount,

    freeze,
    withdraw,

    status: BillStatus.CHECKED,
    updatedBy: operator,
    createdAt: now.getTime(),
    updatedAt: now.getTime()
  };
  const lockTaskBill = await new Bill(lockBillObj).save();

  task.createdAt = now.getTime();
  task.updatedAt = now.getTime();
  task.status = Status.CHECKED;
  task.amount = totalAmount;

  const newTask = await new Task(task).save();
  // child tasks
  const orders = genOrderList(newTask);
  const createOrders = orders.map(async co => {
    const o = await new Order(co).save();
    return o;
  });
  await Promise.all(createOrders);
  return newTask;
};
// const finish = async (_id: string) => {
//   const check = await Task.findById(_id);
//   if (!check) {
//     throw new Error('incorrect _id');
//   }
//   if (check.status !== Status.ASSIGNED && check.status !== Status.APPEAL) {
//     throw new Error(
//       `only ASSIGNED and APPEAL can be finished, task status is ${check.status}`
//     );
//   }
//   if (!check.workerid) {
//     throw new Error(`no worker, please use ABORT`);
//   }

//   const now = new Date();
//   const updatedTask = await Task.findByIdAndUpdate(
//     _id,
//     {
//       $set: {
//         status: Status.FINISHED,
//         updatedAt: now.getTime()
//       }
//     },
//     { new: true }
//   );
//   if (!updatedTask) {
//     throw new Error(`task not found`);
//   }

//   // return updatedTask;

//   // bill info
//   const amount = updatedTask.amount;
//   const worker = await User.findById(check.workerid);
//   if (!worker) {
//     throw new Error('user not found');
//   }
//   const updatedBillBuyer = await Bill.findByIdAndUpdate(worker.billid, {
//     $inc: {
//       remained: amount,
//       total: amount
//     },
//     updatedAt: now.getTime()
//   });
//   const updatedBillStore = await Bill.findByIdAndUpdate(check.userid, {
//     $inc: {
//       freeze: -amount
//     },
//     updatedAt: now.getTime()
//   });
//   const billRecordBuyer = {
//     userid: worker.id,
//     amount: amount,
//     type: BillRecordType.TASK_PAYMENT,
//     status: BillRecordStatus.CHECKED,
//     createdAt: now.getTime(),
//     updatedAt: now.getTime()
//   };
//   const billRecord = await new BillRecord(billRecordBuyer).save();
//   // bill info finished

//   return updatedTask;
// };

// const abort = async (_id: string) => {
//   const check = await Task.findById(_id);
//   if (!check) {
//     throw new Error('incorrect _id');
//   }
//   if (check.status === Status.FINISHED) {
//     throw new Error('incorrent task status');
//   }

//   const now = new Date();
//   const updatedTask = await Task.findByIdAndUpdate(
//     _id,
//     {
//       $set: {
//         status: Status.ABORT,
//         updatedAt: now.getTime()
//       }
//     },
//     { new: true }
//   );
//   if (!updatedTask) {
//     throw new Error(`task not found`);
//   }

//   // return updatedTask;

//   // bill info
//   const amount = updatedTask.amount;
//   const updatedBillStore = await Bill.findByIdAndUpdate(check.userid, {
//     $inc: {
//       total: amount,
//       remained: amount,
//       freeze: -amount
//     },
//     updatedAt: now.getTime()
//   });
//   const billRecordObj = {
//     userid: check.userid,
//     amount: amount,
//     type: BillRecordType.TASK_REFUNK,
//     status: BillRecordStatus.CHECKED,
//     createdAt: now.getTime(),
//     updatedAt: now.getTime()
//   };
//   const billRecordStore = await new BillRecord(billRecordObj).save();
//   // bill info finished
//   return updatedTask;
// };

const abortFinishedTask = async () => {};
export default {
  newTask,
  find,
  findWithStore,
  // findOne,
  findById,
  updateInfo,
  check
  // updateStatus
  // finish,
  // abort
};
