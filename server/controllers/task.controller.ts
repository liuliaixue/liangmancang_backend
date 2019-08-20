import Joi from 'joi'
import Task, { Status, ITask } from '../models/task.model'
import ruleCtrl from './rule.controller'


const taskSchema = Joi.object({
  parent: Joi.string(),
  orderNumber: Joi.string(),

  goodsName: Joi.string(),
  goodsLink: Joi.string(),
  goodsImage: Joi.string(),
  goodsPrice: Joi.number(),
  amount: Joi.number(),
  goodsPriceShowed: Joi.number(),
  specification: Joi.string(),
  isFreeShipping: Joi.bool(),

  howToFindTask: Joi.string(),


  startTime: Joi.number(),
  endTime: Joi.number(),
  amout: Joi.number(),

  commission: Joi.number(),
  platformServiceFee: Joi.number(),
  platformCommission: Joi.number(),

  extraCommission: Joi.number(),
  extraImages: Joi.array(),
  remark: Joi.string(),


  storeid: Joi.string(),
  userid: Joi.string().required(),
  workerid: Joi.string(),


  // # 0 default, 1  being assigned to worker, 2 in appeal 3 finished
  status: Joi.number(),

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

// const createTask = async (task) => {
//     task = await Joi.validate(task, taskSchema, { abortEarly: false });

//     const now = new Date();
//     task.createdAt = now.getTime()
//     task.updatedAt = now.getTime()
//     return await new Task(task).save();
// }

export interface ITaskQuery {
  skip: number,
  limit: number,
  parent: string
  status: Status
}
const find = async (query: ITaskQuery = { skip: 0, limit: 10, parent: '', status: Status.DEFAULT }) => {
  const { skip, limit, parent, status } = query
  // todo filter by parent
  // const filter = { parent }
  const list = await Task.find().skip(skip).limit(limit)
  const total = await Task.count({})

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
  const check = await Task.findByIdAndUpdate(_id, { $set: { status, updatedAt: now.getTime() } }, { new: true })

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
  // todo finish bill 
  const rule = await ruleCtrl.getCurrentRule()
  // const { userid } = {}

}

const undo = async (_id: string) => {

}
export default {
  insert,
  // createTask,
  find,
  // findOne,
  // findById,
  updateInfo,
  updateStatus,
  updateWorker,
  finish

}
