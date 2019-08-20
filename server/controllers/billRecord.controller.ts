
import Joi from 'joi'
import BillRecord, { Type, Status, IBillRecord } from '../models/billRecord.model'
import Bill from '../models/bill.model'


const billRecordSchema = Joi.object({
  userid: Joi.string().required(),
  toUserid: Joi.string().required(),

  amount: Joi.number(),
  type: Joi.number(),

  status: Joi.number(),

  createdAt: Joi.number(),
  updatedAt: Joi.number(),

  resultRecordid: Joi.string(),

})



async function insert(billRecord: IBillRecord) {
  billRecord = await Joi.validate(billRecord, billRecordSchema, { abortEarly: false });

  const now = new Date();
  billRecord.createdAt = now.getTime()
  billRecord.updatedAt = now.getTime()
  return await new BillRecord(billRecord).save();
}

export interface IBillRecordQuery {
  skip: number,
  limit: number,
  types: [number]
  status: Status
}
const find = async (query: IBillRecordQuery = { skip: 0, limit: 10, types: [0], status: 0 }) => {
  const { skip, limit, types, status } = query
  const filter = { $in: { type: types } }
  const billRecordList = await BillRecord.find(filter).skip(skip).limit(limit)
  const billRecordTotal = await BillRecord.count(filter)

  return { list: billRecordList, total: billRecordTotal }
}


// const updateStatus = async (_id, status) => {
//     const now = new Date();
//     const check = await BillRecord.findByIdAndUpdate(_id, { $set: { status, updatedAt: now.getTime() } }, { new: true })

//     if (!check) {
//         throw new Error('incorrect _id')
//     }

//     return check._doc
// }

export interface IBillRecordCheck {
  _id: string
  status: Status
}
const check = async ({ _id, status }: IBillRecordCheck) => {
  // const bill = 

  const billRecord = await BillRecord.findById(_id)
  if (!billRecord) {
    throw new Error("invalid bill record")
  }
  if (billRecord.status === Status.CHECKED) {
    throw new Error('checked billRecord')
  }

  switch (billRecord.type) {
    case Type.DEFAULT: {

      const now = new Date();

      const updatedBillRecord = await BillRecord.findByIdAndUpdate(_id, {
        $set:
        {
          status: Status.CHECKED,
          updatedAt: now.getTime()
        }
      }, { new: true })
      if (!updatedBillRecord) {
        throw new Error('invalid billRecord')
      }
      const bill = await Bill.findOne({ userid: updatedBillRecord.toUserid })
      if (!bill) {
        throw new Error('invalid bill')
      }
      // update bill
      await Bill.findByIdAndUpdate(bill._id,
        {
          $set: {
            total: bill.total + updatedBillRecord.amount,
            remained: bill.remained + updatedBillRecord.amount,
            updatedAt: now.getTime()
          }
        }, { new: true })

      return updatedBillRecord
    }
    case Type.WITHDRAW: {
      const now = new Date();

      const updatedBillRecord = await BillRecord.findByIdAndUpdate(_id, { $set: { status, updatedAt: now.getTime() } }, { new: true })
      if (!updatedBillRecord) {
        throw new Error('invalid billRecord')
      }
      const bill = await Bill.findOne({ userid: updatedBillRecord.toUserid })
      if (!bill) {
        throw new Error('invalid bill')
      }
      const updatedBill = await Bill.findByIdAndUpdate(bill._id,
        {
          $set: {
            remained: bill.remained - updatedBillRecord.amount,
            withdraw: bill.withdraw - updatedBillRecord.amount,
            updatedAt: now.getTime()
          }
        }, { new: true })

      return updatedBillRecord
    }
    default:
      throw "invalid operation"
  }

}



export default { insert, find, check }
