const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../models/user.model');
const Bill = require('../models/bill.model')

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



async function insert(user) {
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
    const userTotal = await User.count()

    return { list: userList, total: userTotal }
}

async function findOne(user) {
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

    return check._doc
}


const findById = async ({ _id }) => {
    const check = await User.findOne({
        _id
    })
    if (!check) {
        throw new Error('incorrect _id')
    }

    return check._doc
}

const updateInfo = async (_id, updateObj) => {
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

    return check._doc
}

const updateStatus = async (_id, status) => {
    const now = new Date();
    const check = await User.findByIdAndUpdate(_id, { $set: { status, updatedAt: now.getTime() } }, { new: true })

    if (!check) {
        throw new Error('incorrect _id')
    }

    return check._doc
}


module.exports = {
    insert,
    find,
    findOne,
    findById,
    updateInfo,
    updateStatus
}
