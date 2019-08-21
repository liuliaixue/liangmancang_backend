
import Joi from 'joi'
import Store, { IStore, Status } from '../models/store.model';


const storeSchema = Joi.object({
  name: Joi.string().required(),
  userid: Joi.string().required(),

  type: Joi.string(),
  website: Joi.string(),
  wangwang: Joi.string(),
  storeScreenShotImage: Joi.string(),


  address: Joi.string(),
  contactPhone: Joi.string(),

  status: Joi.string(),

  createdAt: Joi.number(),
  updatedAt: Joi.number(),


})

const insert = async (store: IStore) => {

  store = await Joi.validate(store, storeSchema, { abortEarly: false });
  const check = await Store.findOne({ name: store.name })
  if (check) {
    throw new Error('name existed')
  }
  const now = new Date();
  store.createdAt = now.getTime()
  store.updatedAt = now.getTime()
  return await new Store(store).save();

}
const find = async (query = { skip: 0, limit: 10 }) => {
  const { skip, limit } = query
  const storeList = await Store.find().skip(skip).limit(limit)
  const storeTotal = await Store.count({})

  return { list: storeList, total: storeTotal }
}
const findById = async ({ _id }: { _id: string }) => {
  const check = await Store.findOne({
    _id
  })
  if (!check) {
    throw new Error('incorrect _id')
  }

  return check
}

const updateInfo = async (_id: string, updateObj: IStore) => {
  const check = await Store.findByIdAndUpdate(_id, {
    $set: {
      ...updateObj,
      updatedAt: new Date().getTime()
    }
  }, { new: true })

  if (!check) {
    throw new Error('incorrect _id')
  }

  return check
}

const updateStatus = async (_id: string, status: Status) => {
  const check = await Store.findByIdAndUpdate(_id, {
    $set: {
      status,
      updatedAt: new Date().getTime()
    }
  }, { new: true })

  if (!check) {
    throw new Error('incorrect _id')
  }

  return check
}


export default {
  insert,
  find,
  findById,
  updateInfo,
  updateStatus

}
