import express = require('express');
import asyncHandler from 'express-async-handler';
import userCtrl from '../controllers/user.controller';

const router = express.Router();

router.route('/').post(asyncHandler(insert));

async function insert(req: express.Request, res: express.Response) {
  let user = await userCtrl.newUser(req.body);
  res.json(user);
}

export default router;
