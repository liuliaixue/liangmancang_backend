// const passport = require('passport');



const User = require('../models/user.model');
const config = require('./config');

const jwt = require('jsonwebtoken');



// const jwtLogin = new JwtStrategy({
//     jwtFromRequest: (req, ) => {
//         console.log(req)
//         return req.header['X-lmc-token'] || null
//     },
//     secretOrKey: config.jwtSecret
// }, async (payload, done) => {
//     let user = await User.findById(payload._id);
//     if (!user) {
//         return done(null, false);
//     }
//     user = user.toObject();
//     delete user.hashedPassword;
//     done(null, user);
// });

// passport.use(jwtLogin);
// module.exports = passport;


const verifyUser = async (req, res, next) => {
    try {
        const token = req.headers['x-lmc-token']
        if (!token) {
            throw new Error('please login first')
        }
        const decoded = jwt.verify(token, config.jwtSecret);
        let user = await User.findById(decoded._id);
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
