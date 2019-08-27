import Joi from 'joi'
import Message, { IMessage } from '../models/message.model';
import { IlistFilter, IListQuery } from './_.controller';
import Task from '../models/task.model';

const messageSchema = Joi.object({

  content: Joi.string().required(),
  taskid: Joi.string().required(),
  userid: Joi.string().required(),

  createdAt: Joi.number(),
  updatedAt: Joi.number(),

})


async function newMessage(msg: IMessage) {

  msg = await Joi.validate(msg, messageSchema, { abortEarly: false })
  const { taskid } = msg
  const task = await Task.findById(taskid)
  if (!task) {
    throw new Error(`invalid task._id`)
  }

  const now = Date.now()
  msg.createdAt = now
  msg.updatedAt = now
  const savedMessage = await new Message(msg).save()
  return savedMessage

}
const update = async (_id: string, udpateObj: IMessage) => {
  const now = Date.now()
  const updatedMessage = await Message.findByIdAndUpdate(_id,
    { ...udpateObj, updatedAt: now },
    { new: true })
  return updatedMessage
}


const find = async (query: IListQuery) => {
  const { skip = 0, limit = 10, taskid } = query
  const filter: IlistFilter = {}
  if (taskid) {
    filter.taskid = taskid
  }

  const checkInList = await Message.find(filter).skip(skip).limit(limit)
  const total = await Message.count(filter)

  return { list: checkInList, total }

}

export default { newMessage, update, find }