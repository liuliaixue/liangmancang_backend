
const Joi = require('joi');
const BillRecord = require('../models/billRecord.model');
const { Type, Status } = require('../models/billRecord.model')

const Bill = require('../models/bill.model')

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



async function insert(billRecord) {
    billRecord = await Joi.validate(billRecord, billRecordSchema, { abortEarly: false });

    const now = new Date();
    billRecord.createdAt = now.getTime()
    billRecord.updatedAt = now.getTime()
    return await new BillRecord(billRecord).save();
}
const find = async (query = { skip: 0, limit: 10, }) => {
    const { skip, limit, types = [0], status = 1 } = query
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

const check = async ({ _id, status }) => {
    const check = await BillRecord.findById(_id)

    const billRecord = await BillRecord.findById(_id)
    if (!billRecord) {
        throw Error("invalid bill record")
    }
    if (billRecord.status === Status.CHECKED) {
        throw new Error('checked billRecord')
    }
    switch (check._doc.type) {
        case Type.DEFAULT: {

            const now = new Date();

            const updatedBillRecord = await BillRecord.findByIdAndUpdate(_id, { $set: { status: Status.CHECKED, updatedAt: now.getTime() } }, { new: true })
            const bill = await Bill.findOne({ userid: updatedBillRecord.userid })
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
            const bill = await Bill.findOne({ userid: updatedBillRecord.userid })
            const updatedBill = await Bill.findByIdAndUpdate(bill._id,
                {
                    $set: {
                        remained: updatedBill.remained - updatedBillRecord.amount,
                        withdraw: updatedBill.withdraw - updatedBillRecord.amount,
                        updatedAt: now.getTime()
                    }
                }, { new: true })

            return updatedBillRecord
        }
        default:
            throw "invalid operation"
    }

}


module.exports = {
    insert,
    find,
    // updateStatus,
    check
}

