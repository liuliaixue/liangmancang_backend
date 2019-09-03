import User, { IUser } from '../models/user.model';
import config from './config';
import express from 'express';
import jwt from 'jsonwebtoken';

export interface IReq extends express.Request {
  user: IUser;
}

const verifyUser = async function(
  req: any,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const token = req.get('x-lmc-token');
    if (!token) {
      throw new Error('please login first');
    }
    const decoded: any = jwt.verify(token, config.jwtSecret);

    let user = await User.findById(decoded._id);
    if (!user) {
      throw new Error('invalid user');
    }

    req.user = user;

    next();
  } catch (e) {
    res.status(500).end(e.message);
    next();
  }
};

export default {
  verifyUser
};
