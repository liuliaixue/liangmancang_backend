import CheckIn from '../models/checkIn.model'
import { IListQuery } from './_.controller';





async function findOne(filter: object) {
  const check = await CheckIn.findOne(filter)
  if (!check) {
    throw new Error(`incorrect filter ${JSON.stringify(filter)}`)
  }
  return check
}

async function newCheckIn(userid: string) {
  const now = new Date()
  const checkInObj = {
    userid,
    createdAt: now.getTime(),
    updatedAt: now.getTime()
  }
  const checkIn = await new CheckIn(checkInObj).save()
  return checkIn
}


async function find(query: IListQuery = { skip: 0, limit: 10 }) {
  const { skip, limit, userid } = query

  const checkInList = await CheckIn.find({ userid }).skip(skip).limit(limit)
  const total = await CheckIn.count({})

  return { list: checkInList, total }
}

export default {
  findOne,
  newCheckIn,
  find,

}