import Joi from 'joi';

import Bill, { Status, Type, IBill } from '../models/bill.model';
import User from '../models/user.model';

const billSchema = Joi.object({
  toUserid: Joi.string(),
  type: Joi.string(),
  amount: Joi.number().max(100 * 10000 * 100),

  status: Joi.string(),

  fromBank: Joi.string(),
  fromCard: Joi.string(),
  fromUser: Joi.string(),

  userid: Joi.string(),
  createdAt: Joi.number(),
  updatedAt: Joi.number()
});

async function findOne(query: object) {
  const check = await Bill.findOne(query);
  if (!check) {
    throw new Error(`incorrect query ${JSON.stringify(query)}`);
  }
  return check;
}
const findById = async (_id: string) => {
  const bill = await Bill.findById(_id);
  return bill;
};

const newBill = async (bill: IBill) => {
  bill = await Joi.validate(bill, billSchema, { abortEarly: false });
  const now = new Date();

  return await new Bill({
    ...bill,
    total: 0,
    remained: 0,
    freeze: 0,
    withdraw: 0,
    createdAt: now.getTime(),
    updatedAt: now.getTime(),
    status: bill.status || Status.CHECKED
  }).save();
};

export interface IBillQuery {
  skip: number;
  limit: number;
  userid?: string;
  status?: string;
}
const find = async (query: IBillQuery) => {
  const { skip, limit, userid, status } = query;
  const filter = { status, userid };
  if (!userid) delete filter.userid;
  if (!status) delete filter.status;
  const billList = await Bill.find(filter)
    .sort({ updatedAt: -1 })
    .skip(skip)
    .limit(limit);
  const billTotal = await Bill.count(filter);
  return { list: billList, total: billTotal };
};
const check = async (_id: string) => {
  const now = new Date();
  const bill = await Bill.findById(_id);
  if (!bill) {
    throw new Error('bill not found');
  }
  if (bill.status === Status.CHECKED) {
    throw new Error('checked bill');
  }

  const lastestBill = await Bill.find({ status: Status.CHECKED })
    .sort({
      updatedAt: -1
    })
    .limit(1);
  if (!lastestBill || !lastestBill[0]) {
    throw new Error('checked bill');
  }
  switch (bill.type) {
    case Type.DEFAULT: {
      const now = new Date();

      // update bill
      const updatedBill = await Bill.findByIdAndUpdate(
        bill._id,
        {
          $set: {
            total: lastestBill[0].total + bill.amount,
            remained: lastestBill[0].remained + bill.amount,
            updatedAt: now.getTime(),
            status: Status.CHECKED
          }
        },
        { new: true }
      );

      if (!updatedBill) {
        throw new Error('invalid bill');
      }
      return updatedBill;
    }
    case Type.WITHDRAW: {
      // update bill
      const updatedBill = await Bill.findByIdAndUpdate(
        bill._id,
        {
          $set: {
            remained: lastestBill[0].remained - bill.amount,
            withdraw: lastestBill[0].withdraw - bill.amount,
            updatedAt: now.getTime(),
            status: Status.CHECKED
          }
        },
        { new: true }
      );
      return updatedBill;
    }
    default:
      throw 'invalid operation';
  }
};

const findUserLastestBill = async (_id: string) => {
  const bill = await Bill.find({
    userid: _id,
    status: Status.CHECKED
  }).sort({ updatedAt: -1 });
  if (!bill || !bill[0]) {
    throw new Error('user bill not found');
  }
  return bill[0];
};
export default {
  findOne,
  findById,
  newBill,
  find,
  check,
  findUserLastestBill
};
