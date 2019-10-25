import Order, { Status } from '../models/order.model';
import Task from '../models/task.model';
import Bill, {
  IBill,
  Status as BillStatus,
  Type as BillType
} from '../models/bill.model';
import ruleCtrl from './rule.controller';
import User from '../models/user.model';
import billCtrl from './bill.controller';

export interface IOrderQuery {
  skip: number;
  limit: number;
  userid?: string;
  status?: Status;
  workerid?: string;
}
const find = async (query: IOrderQuery) => {
  const { skip, limit, userid, status, workerid } = query;

  const filter = {
    userid,
    status,
    workerid
  };
  if (!userid) delete filter.userid;
  if (!status) delete filter.status;
  if (!workerid) delete filter.workerid;

  const list = await Order.find(filter)
    .skip(skip)
    .limit(limit);
  const total = await Order.count(filter);

  return { list, total };
};
const findById = async (_id: string) => {
  const check = await Order.findById(_id);
  if (!check) {
    throw new Error(`invalid _id`);
  }
  return check;
};

const updateStatus = async (_id: string, status: Status) => {
  const now = new Date();
  const check = await Order.findByIdAndUpdate(
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
  const check = await Order.findByIdAndUpdate(
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
  const check = await Order.findById(_id);
  if (!check) {
    throw new Error('incorrect _id');
  }
  if (check.status !== Status.ASSIGNED) {
    throw new Error(
      `only ASSIGNED can be finished, task status is ${check.status}`
    );
  }
  if (!check.workerid) {
    throw new Error(`no worker, please use ABORT`);
  }
  const now = new Date();
  const updatedOrder = await Order.findByIdAndUpdate(
    _id,
    {
      $set: {
        status: Status.FINISHED,
        updatedAt: now.getTime()
      }
    },
    { new: true }
  );
  if (!updatedOrder) {
    throw new Error(`order not found`);
  }
  const task = await Task.findById(updatedOrder.taskid);
  if (!task) {
    throw new Error(`task not found`);
  }
  // bill deposit and commission info
  const { userCommission } = ruleCtrl.getCurrentOrderAmount(check, task);
  const totalAmount = userCommission;
  const worker = await User.findById(check.workerid);
  if (!worker) {
    throw new Error('user not found');
  }
  const bill = await billCtrl.findUserLastestBill(worker._id);
  if (!bill) {
    throw new Error('user bill info not found');
  }
  const { total, remained, freeze, withdraw } = bill;
  const payBillObj = {
    userid: task.userid,
    amount: totalAmount,
    type: BillType.TASK_PAYMENT,
    total: bill.total + totalAmount,
    remained: bill.remained + totalAmount,

    freeze,
    withdraw,

    status: BillStatus.CHECKED,
    updatedBy: null,
    createdAt: now.getTime(),
    updatedAt: now.getTime()
  };
  await new Bill(payBillObj).save();

  return updatedOrder;
};
const abort = async () => {};

export default {
  find,
  findById,
  updateStatus,
  updateWorker,
  finish,
  abort
};
