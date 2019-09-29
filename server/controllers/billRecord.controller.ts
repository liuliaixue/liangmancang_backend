import Joi from 'joi';
import BillRecord, {
  Type,
  Status,
  IBillRecord
} from '../models/billRecord.model';
import Bill from '../models/bill.model';
import User from '../models/user.model';

const billRecordSchema = Joi.object({
  userid: Joi.string().required(),
  toUserid: Joi.string().required(),

  amount: Joi.number().max(100 * 10000 * 100),
  type: Joi.string(),

  status: Joi.string(),

  fromBank: Joi.string(),
  fromCard: Joi.string(),
  fromUser: Joi.string(),

  createdAt: Joi.number(),
  updatedAt: Joi.number(),

  resultRecordid: Joi.string()
});

async function insert(billRecord: IBillRecord) {
  // todo verify toUserid
  billRecord = await Joi.validate(billRecord, billRecordSchema, {
    abortEarly: false
  });

  const now = new Date();
  billRecord.createdAt = now.getTime();
  billRecord.updatedAt = now.getTime();
  return await new BillRecord(billRecord).save();
}

export interface IBillRecordQuery {
  skip: number;
  limit: number;
  types?: [number];
  status?: Status;
}
export interface IBillRecordFilter {
  types?: [number];
  status?: Status;
}
const find = async (query: IBillRecordQuery = { skip: 0, limit: 10 }) => {
  const { skip, limit, types, status } = query;
  // const filter = { $in: { type: types } }
  const filter: IBillRecordFilter = {};
  // if (types) filter.types = types
  // todo filter
  if (status) filter.status = status;

  const billRecordList = await BillRecord.find(filter)
    .skip(skip)
    .limit(limit);
  const billRecordTotal = await BillRecord.count(filter);

  return { list: billRecordList, total: billRecordTotal };
};

// const updateStatus = async (_id, status) => {
//     const now = new Date();
//     const check = await BillRecord.findByIdAndUpdate(_id, { $set: { status, updatedAt: now.getTime() } }, { new: true })

//     if (!check) {
//         throw new Error('incorrect _id')
//     }

//     return check._doc
// }

export interface IBillRecordCheck {
  _id: string;
  status: Status;
}
const check = async ({ _id, status }: IBillRecordCheck) => {
  // const bill =

  const billRecord = await BillRecord.findById(_id);
  if (!billRecord) {
    throw new Error('invalid bill record');
  }
  if (billRecord.status === Status.CHECKED) {
    throw new Error('checked billRecord');
  }

  switch (billRecord.type) {
    case Type.DEFAULT: {
      const now = new Date();

      // const updatedBillRecord = await BillRecord.findByIdAndUpdate(
      //   _id,
      //   {
      //     $set: {
      //       status: Status.CHECKED,
      //       updatedAt: now.getTime()
      //     }
      //   },
      //   { new: true }
      // );
      // if (!updatedBillRecord) {
      //   throw new Error('invalid billRecord');
      // }
      const user = await User.findById(billRecord.toUserid);
      if (!user) {
        throw new Error('invalid toUserid');
      }
      const bill = await Bill.findById(user.billid);
      if (!bill) {
        throw new Error('invalid bill');
      }
      // update bill
      await Bill.findByIdAndUpdate(
        bill._id,
        {
          $set: {
            total: bill.total + billRecord.amount,
            remained: bill.remained + billRecord.amount,
            updatedAt: now.getTime()
          }
        },
        { new: true }
      );
      // update billrecord
      const updatedBillRecord = await BillRecord.findByIdAndUpdate(
        _id,
        {
          $set: {
            status: Status.CHECKED,
            updatedAt: now.getTime(),
            remained: bill.remained + billRecord.amount
          }
        },
        { new: true }
      );
      if (!updatedBillRecord) {
        throw new Error('invalid billRecord');
      }
      return updatedBillRecord;
    }
    case Type.WITHDRAW: {
      const now = new Date();

      const user = await User.findById(billRecord.toUserid);
      if (!user) {
        throw new Error('invalid toUserid');
      }
      const bill = await Bill.findById(user.billid);
      if (!bill) {
        throw new Error('invalid bill');
      }
      // update bill
      await Bill.findByIdAndUpdate(
        bill._id,
        {
          $set: {
            remained: bill.remained - billRecord.amount,
            withdraw: bill.withdraw - billRecord.amount,
            updatedAt: now.getTime()
          }
        },
        { new: true }
      );
      // update bill record
      const updatedBillRecord = await BillRecord.findByIdAndUpdate(
        _id,
        {
          $set: {
            status: Status.CHECKED,
            updatedAt: now.getTime(),
            remained: bill.remained + billRecord.amount
          }
        },
        { new: true }
      );
      if (!updatedBillRecord) {
        throw new Error('invalid billRecord');
      }
      return updatedBillRecord;
    }
    default:
      throw 'invalid operation';
  }
};

export default { insert, find, check };
