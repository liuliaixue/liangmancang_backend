import Joi from 'joi'
import Task, { Status, ITask } from '../models/task.model'
import ruleCtrl from './rule.controller'
import { IRule } from '../models/rule.model';
import BillRecord, { IBillRecord, Status as BillRecordStatus, Type as BillRecordType } from '../models/billRecord.model';
import Bill from '../models/bill.model';


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
  updatedAt: Joi.number(),

})



const insert = async (task: ITask) => {

  task = await Joi.validate(task, taskSchema, { abortEarly: false });

  const now = new Date();
  task.createdAt = now.getTime()
  task.updatedAt = now.getTime()
  return await new Task(task).save();

}

const newTask = async (task: ITask) => {
  task = await Joi.validate(task, taskSchema, { abortEarly: false });
  const now = new Date()

  //todo bill lock bill
  const rule = await ruleCtrl.getCurrentRule()
  if (!rule) {
    throw new Error('unable to got rule')
  }
  if (!Number.isInteger(task.total) || !Number.isInteger(task.extraCommission)) {
    throw new Error(`total is ${task.total}`)
  }

  const amount = (ruleCtrl.gerCurrentRuleAmount(rule) + task.extraCommission) * task.total
  if (!Number.isInteger(amount)) {
    throw new Error('server error')
  }

  const bill = await Bill.findOne({ userid: task.userid })
  if (!bill) {
    throw new Error('user bill info not found')
  }
  if (bill.remained < amount) {
    throw new Error('余额不足')
  }

  // lock bill and add billRecord
  const updatedBill = await Bill.findByIdAndUpdate(bill._id,
    {
      $set: {
        remained: bill.remained - amount,
        freeze: bill.freeze + amount,
        updatedAt: now.getTime()
      }
    }, { new: true })
  const lockRecordObj = {
    userid: task.userid,
    amount: amount,
    type: BillRecordType.TASK_LOCK,
    status: BillRecordStatus.DEFAULT,
    createdAt: now.getTime(),
    updatedAt: now.getTime()
  }
  const lockTaskBillRecord = await new BillRecord(lockRecordObj).save()


  task.createdAt = now.getTime()
  task.updatedAt = now.getTime()
  task.status = Status.DEFAULT
  return await new Task(task).save();
}

export interface ITaskQuery {
  skip: number,
  limit: number,
  userid?: string,
  parent?: string,
  status?: Status,
}
export interface ItaskFilter {
  userid?: string,
  parent?: string,
  status?: Status,
}
const find = async (query: ITaskQuery = { skip: 0, limit: 10, }) => {
  const { skip, limit, userid, parent, status } = query
  // todo filter by parent
  const filter: ItaskFilter = {}
  if (userid) {
    filter.userid = userid
  }
  if (parent) {
    filter.parent = parent
  }
  if (status) {
    filter.status = status
  }

  const list = await Task.find(filter).skip(skip).limit(limit)
  const total = await Task.count(filter)

  return { list, total }
}


const updateInfo = async (_id: string, updateObj: ITask) => {
  const now = new Date();
  const check = await Task.findByIdAndUpdate(_id,
    {
      $set: {
        ...updateObj,
        updatedAt: now.getTime()
      }
    }, { new: true })

  if (!check) {
    throw new Error('incorrect _id')
  }

  return check
}

const updateStatus = async (_id: string, status: Status) => {
  const now = new Date();
  const check = await Task.findByIdAndUpdate(_id, {
    $set: {
      status, updatedAt: now.getTime()
    }
  }, { new: true })

  if (!check) {
    throw new Error('incorrect _id')
  }

  return check
}

const updateWorker = async (_id: string, workerid: string) => {
  const now = new Date();
  const check = await Task.findByIdAndUpdate(_id, {
    $set: {
      workerid,
      status: Status.ASSIGNED,
      updatedAt: now.getTime()
    }
  }, { new: true })

  if (!check) {
    throw new Error('incorrect _id')
  }

  return check
}

const finish = async (_id: string) => {

  const check = await Task.findById(_id)
  if (!check) {
    throw new Error('incorrect _id')
  }
  if (check.status === Status.FINISHED) {
    throw new Error('the task is already finished')
  }
  if (check.status === Status.DEFAULT) {

  }


  const now = new Date()
  const updatedTask = await Task.findByIdAndUpdate(_id, {
    $set: {
      status: Status.FINISHED,
      updatedAt: now.getTime()
    }
  }, { new: true })


  return updatedTask

  // todo finish bill 
  // const rule = await ruleCtrl.getCurrentRule()
  // const { userid } = {}

}

const abort = async (_id: string) => {

  const check = await Task.findById(_id)
  if (!check) {
    throw new Error('incorrect _id')
  }
  if (check.status == Status.DEFAULT) {
    throw new Error('incorrent task status')
  }

  const now = new Date()
  const updatedTask = await Task.findByIdAndUpdate(_id, {
    $set: {
      status: Status.ABORT,
      updatedAt: now.getTime()
    }
  }, { new: true })


  return updatedTask
  // todo finish bill 
}
export default {
  insert,
  newTask,
  find,
  // findOne,
  // findById,
  updateInfo,
  updateStatus,
  updateWorker,
  finish,
  abort

}
