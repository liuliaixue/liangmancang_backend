import bcrypt from 'bcryptjs';
import Joi, { func } from 'joi';
import User, { IUser, Status } from '../models/user.model';
import Bill from '../models/bill.model';
import Err from '../tools/error';
import shortid from '../tools/shortid';
import { getUserAclList } from './role.controller';

const userSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(50)
    .required(),
  password: Joi.string()
    .min(6)
    .required(),

  fullname: Joi.string(),
  mobilePhone: Joi.string().regex(/^[1-9][0-9]{10}$/),
  inviter: Joi.string(),

  qq: Joi.string(),
  idCard: Joi.string(),
  bankCard: Joi.string(),
  status: Joi.string(),

  createdAt: Joi.number(),
  updatedAt: Joi.number()
});

async function newUser(user: IUser) {
  user = await Joi.validate(user, userSchema, { abortEarly: false });
  const check = await User.findOne({ username: user.username });
  if (check) {
    // throw new Error('username existed');
    throw Err.Existed(`username=${user.username}`);
  }
  const checkPhoneNumber = await User.findOne({
    mobilePhone: user.mobilePhone
  });
  if (checkPhoneNumber) {
    throw Err.Existed(`mobilePhone=${user.mobilePhone}`);
  }
  const now = new Date();
  //create new bill
  const billObj = {
    total: 0,
    remained: 0,
    freeze: 0,
    withdraw: 0,
    createdAt: now.getTime(),
    updatedAt: now.getTime()
  };
  const bill = await new Bill(billObj).save();

  //craete new user
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  delete user.password;
  user.createdAt = now.getTime();
  user.updatedAt = now.getTime();
  user.code = shortid.generate();
  user.billid = bill.id;
  const savedUser = await new User(user).save();

  return savedUser;
}

const find = async (query = { skip: 0, limit: 10 }) => {
  const { skip, limit } = query;
  const userList = await User.find()
    .skip(skip)
    .limit(limit);
  const userTotal = await User.count({});

  return { list: userList, total: userTotal };
};

interface userLogin {
  username: string;
  password: string;
}
async function login(user: userLogin) {
  const check = await User.findOne({
    username: user.username
  });
  if (!check) {
    throw new Error('incorrect username');
  }
  const comparePassword = bcrypt.compareSync(
    user.password,
    check.hashedPassword
  );
  if (!comparePassword) {
    throw new Error('incorrect password');
  }

  return check;
}

async function adminLogin(user: userLogin) {
  const check = await User.findOne({
    username: user.username
  });
  if (!check) {
    throw new Error('incorrect username');
  }
  const comparePassword = bcrypt.compareSync(
    user.password,
    check.hashedPassword
  );
  if (!comparePassword) {
    throw new Error('incorrect password');
  }

  return check;
}

async function findUserByCode(code: string) {
  const check = await User.findOne({ code });
  if (!check) {
    throw new Error(`incorrect user code ${code}`);
  }
  return check;
}

const findById = async (_id: string) => {
  const check = await User.findById(_id);
  if (!check) {
    throw new Error('incorrect _id');
  }

  return check;
};

const updateInfo = async (_id: string, updateObj: IUser) => {
  const now = new Date();

  const check = await User.findByIdAndUpdate(
    _id,
    {
      $set: {
        ...updateObj,
        updatedAt: now.getTime()
      }
    },
    { new: true }
  );

  if (!check) {
    throw new Error('incorrect _id');
  }

  return check;
};

const updatePassword = async (
  _id: string,
  password: string,
  newPassword: string
) => {
  const now = new Date();
  const check = await User.findById(_id);
  if (!check) {
    throw Err.NotFound(`userid=${_id}`);
  }
  const comparePassword = bcrypt.compareSync(password, check.hashedPassword);
  if (!comparePassword) {
    throw Err.NotMatch('password');
  }
  check.hashedPassword = bcrypt.hashSync(newPassword, 10);
  check.updatedAt = now.getTime();
  return check.save();
};
const resetPassword = async (username: string, newPassword: string) => {
  const now = new Date();
  const check = await User.findOne({ username });
  if (!check) {
    throw Err.NotFound(`username=${username}`);
  }

  check.hashedPassword = bcrypt.hashSync(newPassword, 10);
  check.updatedAt = now.getTime();
  return check.save();
};

const updateStatus = async (_id: string, status: Status) => {
  if (status === Status.DEFAULT) {
    throw new Error('invalid status');
  }
  const now = new Date();
  const check = await User.findByIdAndUpdate(
    _id,
    { $set: { status, updatedAt: now.getTime() } },
    { new: true }
  );

  if (!check) {
    throw new Error('incorrect _id');
  }

  return check;
};

export default {
  newUser,
  login,
  adminLogin,
  updatePassword,
  resetPassword,
  find,
  findUserByCode,
  findById,
  updateInfo,
  updateStatus
};
