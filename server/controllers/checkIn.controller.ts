import CheckIn from '../models/checkIn.model'
import { IListQuery } from './_.controller';





async function findOne(filter: object) {
  const check = await CheckIn.findOne(filter)
  if (!check) {
    throw new Error(`incorrect filter ${JSON.stringify(filter)}`)
  }
  return check
}

const findById = async ({ _id }: { _id: string }) => {
  const check = await CheckIn.findById(_id)
  if (!check) {
    throw new Error('incorrect _id')
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
  // todo add bill
  return checkIn
}

interface ICheckInFilter {
  userid?: string
}
async function find(query: IListQuery) {
  const { skip = 0, limit = 10, userid } = query
  const filter: ICheckInFilter = {}
  if (userid) {
    filter.userid = userid
  }

  const checkInList = await CheckIn.find(filter).skip(skip).limit(limit)
  const total = await CheckIn.count(filter)

  return { list: checkInList, total }
}


export default {
  newCheckIn,

  findOne,
  findById,
  find,

}