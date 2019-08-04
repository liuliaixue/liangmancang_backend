const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../models/user.model');

const userSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),

    fullname: Joi.string(),
    mobileNumber: Joi.string().regex(/^[1-9][0-9]{10}$/),
})


module.exports = {
    insert,

    findOne,
}

async function insert(user) {
    user = await Joi.validate(user, userSchema, { abortEarly: false });
    const check = await User.findOne({ username: user.username })
    if (check) {
        throw new Error('username existed')
    }
    console.log(check)
    user.hashedPassword = bcrypt.hashSync(user.password, 10);
    delete user.password;
    return await new User(user).save();
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