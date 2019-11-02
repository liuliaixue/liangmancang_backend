import Joi, { func } from 'joi';
import Message, { IMessage } from '../models/message.model';
import { IlistFilter, IListQuery } from './_.controller';
import Task from '../models/task.model';

const messageSchema = Joi.object({
  content: Joi.string().required(),
  // taskid: Joi.string(),
  type: Joi.string().required(),
  toUserid: Joi.string(),

  userid: Joi.string().required(),
  createdAt: Joi.number(),
  updatedAt: Joi.number()
});

async function newMessage(msg: IMessage) {
  msg = await Joi.validate(msg, messageSchema, { abortEarly: false });
  // todo: check message appeal process, 订单申诉流程

  // const { taskid } = msg;
  // const task = await Task.findById(taskid);
  // if (!task) {
  //   throw new Error(`invalid task._id`);
  // }

  const now = Date.now();
  msg.createdAt = now;
  msg.updatedAt = now;
  const savedMessage = await new Message(msg).save();
  return savedMessage;
}

async function remove(_id: string) {
  const res = await Message.findByIdAndRemove(_id);
  return res;
}

const update = async (_id: string, udpateObj: IMessage) => {
  const now = Date.now();
  const updatedMessage = await Message.findByIdAndUpdate(
    _id,
    { ...udpateObj, updatedAt: now },
    { new: true }
  );
  return updatedMessage;
};

const find = async (query: IListQuery) => {
  const { skip = 0, limit = 10, taskid, type } = query;
  const filter = { taskid, type };
  if (!taskid) delete filter.taskid;

  const checkInList = await Message.find(filter)
    .skip(skip)
    .limit(limit);
  const total = await Message.count(filter);

  return { list: checkInList, total };
};
const findById = async (_id: string) => {
  const check = await Message.findById(_id);
  if (!check) {
    throw new Error('message not found');
  }

  return check;
};

export default { newMessage, remove, update, find, findById };
