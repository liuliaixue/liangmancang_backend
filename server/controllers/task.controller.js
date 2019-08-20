
const Joi = require('joi');
const Task = require('../models/task.model');
const { Status } = Task
const ruleCtrl = require('./rule.controller')
const BillRecord = require('../models/billRecord.model')
const Bill = require('../models/bill.model')

const taskSchema = Joi.object({
    parent: Joi.string(),
    orderNumber: Joi.string(),

    goodsName: Joi.string(),
    goodsLink: Joi.string(),
    goodsImage: Joi.string(),
    goodsPrice: Joi.number(),
    amount: Joi.number(),
    goodsPriceShowed: Joi.number(),
    specification: Joi.string(),
    isFreeShipping: Joi.bool(),

    howToFindTask: Joi.string(),


    startTime: Joi.number(),
    endTime: Joi.number(),
    amout: Joi.number(),

    commission: Joi.number(),
    platformServiceFee: Joi.number(),
    platformCommission: Joi.number(),

    extraCommission: Joi.number(),
    extraImages: Joi.array(),
    remark: Joi.string(),

    // # 0 default, 1  being assigned to worker, 2 in appeal 3 finished
    status: Joi.number(),

    storeid: Joi.string(),
    userid: Joi.string().required(),
    workerid: Joi.string(),

    status: Joi.number(),

    createdAt: Joi.number(),
    updatedAt: Joi.number(),

})



const insert = async (task) => {

    task = await Joi.validate(task, taskSchema, { abortEarly: false });

    const now = new Date();
    task.createdAt = now.getTime()
    task.updatedAt = now.getTime()
    return await new Task(task).save();

}

// const createTask = async (task) => {
//     task = await Joi.validate(task, taskSchema, { abortEarly: false });

//     const now = new Date();
//     task.createdAt = now.getTime()
//     task.updatedAt = now.getTime()
//     return await new Task(task).save();
// }


const find = async (query = { skip: 0, limit: 10 }) => {
    const { skip, limit, parent, status } = query
    // todo filter by parent
    // const filter = { parent }
    const list = await Task.find().skip(skip).limit(limit)
    const total = await Task.count()

    return { list, total }
}


const updateInfo = async (_id, updateObj) => {
    const now = new Date();
    const check = await Task.findByIdAndUpdate(_id,
        {
            $set: {
                ...updateObj,
                updatedAt: now.getTime()
            }
        }, { new: true })

    if (!check) {
        throw new Error('incorrect _id')
    }

    return check._doc
}

const updateStatus = async (_id, status) => {
    const now = new Date();
    const check = await Task.findByIdAndUpdate(_id, { $set: { status, updatedAt: now.getTime() } }, { new: true })

    if (!check) {
        throw new Error('incorrect _id')
    }

    return check._doc
}

const updateWorker = async (_id, workerid) => {
    const now = new Date();
    const check = await Task.findByIdAndUpdate(_id, {
        $set: {
            workerid,
            status: Status.ASSIGNED,
            updatedAt: now.getTime()
        }
    }, { new: true })

    if (!check) {
        throw new Error('incorrect _id')
    }

    return check._doc
}

const finish = async (_id) => {

    const check = await Task.findById(_id)
    if (!check) {
        throw new Error('incorrect _id')
    }
    // todo finish bill 
    const rule = await ruleCtrl.getCurrentRule()
    // const { userid } = {}

}

const undo = async (_id) => {

}

module.exports = {
    insert,
    // createTask,
    find,
    // findOne,
    // findById,
    updateInfo,
    updateStatus,
    updateWorker,
    finish

}
