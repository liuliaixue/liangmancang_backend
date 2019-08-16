// const passport = require('passport');



const User = require('../models/user.model');
const config = require('./config');

const jwt = require('jsonwebtoken');

const verifyUser = async (req, res, next) => {
    try {
        const token = req.headers['x-lmc-token']
        if (!token) {
            throw new Error('please login first')
        }
        const decoded = jwt.verify(token, config.jwtSecret);

        let user = await User.findById(decoded._id);
        if (!user) {
            throw new Error('invalid user')
        }

        req.user = user
        next()
    } catch (e) {
        res.status(500).end(e.message)
        next()
    }
}

module.exports = {
    verifyUser
}
