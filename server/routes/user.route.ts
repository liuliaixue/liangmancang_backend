import express = require('express');
import asyncHandler from 'express-async-handler';
import userCtrl from '../controllers/user.controller';

const router = express.Router();

// router.route('/').post(asyncHandler(insert));

async function insert(req: express.Request, res: express.Response) {
  let user = await userCtrl.newUser(req.body);
  res.json(user);
}

//todo
router.route('/verificationCode').post(async (req, res) => {
  const { phone } = req.body;
  res.send('todo');
});
//todo
router.route('/password/reset').post(async (req, res) => {
  const { username, password, verificationCode } = req.body;
  res.send('todo');
});

export default router;
