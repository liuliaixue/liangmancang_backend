import express = require('express');
import userCtrl from '../controllers/user.controller';
import logger from '../tools/logger';
import { invalid } from 'joi';

const router = express.Router();

// router.route('/').post(asyncHandler(insert));

async function insert(req: express.Request, res: express.Response) {
  let user = await userCtrl.newUser(req.body);
  res.json(user);
}

//todo 短信验证码
router.route('/verificationCode').post(async (req, res) => {
  logger.info({ _from: '/verificationCode', ...req.body });
  const { mobilePhone } = req.body;
  if (!mobilePhone) {
    throw new Error('invalid mobilePhone');
  }
  res.send({
    _id: '000001',
    mobilePhone,
    code: '909090'
  });
});
//todo
router.route('/resetPassword').post(async (req, res) => {
  logger.info({ _from: '/resetPassword', ...req.body });
  const { username, newPassword, verificationCode } = req.body;
  if (verificationCode !== '909090') {
    throw new Error('invalid verificationCode');
  }
  if (!username || !newPassword) {
    throw new Error('invalid request');
  }

  const user = await userCtrl.resetPassword(username, newPassword);

  res.send(user);
});

export default router;
