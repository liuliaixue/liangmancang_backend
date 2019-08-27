
import express from 'express'
import asyncHandler from "express-async-handler"
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'
import config from '../config/config'
import passport, { IReq } from '../config/passport'
import logger from '../tools/logger';



const router = express.Router();


router.post('/register', asyncHandler(register));
router.post('/login', login);
router.get('/me', passport.verifyUser, getCurrentUser);


async function register(req: any, res: express.Response, next: express.NextFunction) {
  logger.info({ _from: "/register", ...req.body })



  let user = await userCtrl.insert(req.body);
  user = user.toObject();
  delete user.hashedPassword;

  req.user = user;
  let token = authCtrl.generateToken(user);
  res.json({ user, token });
}

async function login(req: any, res: express.Response) {
  logger.info({ _from: "/login", ...req.body })

  let user = await userCtrl.login(req.body);
  let token = authCtrl.generateToken(user);
  res.json({ user, token });
}

function getCurrentUser(req: any, res: express.Response) {
  logger.info({ _from: "/me", ...req.body })
  res.json({ user: req.user })
}

export default router