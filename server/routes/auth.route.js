const express = require('express');
const asyncHandler = require('express-async-handler')
const userCtrl = require('../controllers/user.controller');
const authCtrl = require('../controllers/auth.controller');
const config = require('../config/config');
const passport = require('../config/passport')

const router = express.Router();
module.exports = router;

router.post('/register', asyncHandler(register), login);
router.post('/login', login);
router.get('/me', passport.verifyUser, getCurrentUser);


async function register(req, res, next) {
    let user = await userCtrl.insert(req.body);
    user = user.toObject();
    delete user.hashedPassword;
    req.user = user;
    next()
}

async function login(req, res) {
    let user = await userCtrl.findOne(req.body);
    let token = authCtrl.generateToken(user);
    res.json({ user, token });
}

function getCurrentUser(req, res) {
    res.json({ user: req.user })
}