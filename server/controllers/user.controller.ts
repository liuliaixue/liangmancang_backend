

import bcrypt from 'bcrypt'
import Joi, { string } from 'joi'
import User, { IUser, Status } from '../models/user.model'
import Bill from "../models/bill.model"

const userSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),

  fullname: Joi.string(),
  mobileNumber: Joi.string().regex(/^[1-9][0-9]{10}$/),

  qq: Joi.string(),
  idCard: Joi.string(),
  bankCard: Joi.string(),
  status: Joi.number(),

  createdAt: Joi.number(),
  updatedAt: Joi.number(),

})



async function insert(user: IUser) {
  user = await Joi.validate(user, userSchema, { abortEarly: false });
  const check = await User.findOne({ username: user.username })
  if (check) {
    throw new Error('username existed')
  }
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  delete user.password;
  const now = new Date();
  user.createdAt = now.getTime()
  user.updatedAt = now.getTime()
  const savedUser = await new User(user).save();


  const billObj = {
    userid: savedUser._id,
    total: 0,
    remained: 0,
    freeze: 0,
    withdraw: 0,
    createdAt: now.getTime(),
    updatedAt: now.getTime(),
  }
  const bill = await new Bill(billObj).save()

  return savedUser
}
const find = async (query = { skip: 0, limit: 10 }) => {
  const { skip, limit } = query
  const userList = await User.find().skip(skip).limit(limit)
  const userTotal = await User.count({})

  return { list: userList, total: userTotal }
}

interface userLogin {
  username: string,
  password: string
}
async function findOne(user: userLogin) {
  const check = await User.findOne({
    username: user.username,

  })
  if (!check) {
    throw new Error('incorrect username')
  }
  const comparePassword = bcrypt.compareSync(user.password, check.hashedPassword);
  if (!comparePassword) {
    throw new Error('incorrect password')
  }

  return check
}


const findById = async ({ _id }: { _id: string }) => {
  const check = await User.findOne({
    _id
  })
  if (!check) {
    throw new Error('incorrect _id')
  }

  return check
}

const updateInfo = async (_id: string, updateObj: IUser) => {
  const now = new Date();
  const check = await User.findByIdAndUpdate(_id,
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
  const check = await User.findByIdAndUpdate(_id, { $set: { status, updatedAt: now.getTime() } }, { new: true })

  if (!check) {
    throw new Error('incorrect _id')
  }

  return check
}


export default {
  insert,
  find,
  findOne,
  findById,
  updateInfo,
  updateStatus
}
