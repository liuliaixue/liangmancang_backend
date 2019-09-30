//todo acl check
// const requireAdmin = () => { }
import userCtrl from '../controllers/user.controller';
import logger from '../tools/logger';
import { IReq } from '../config/passport';
import billRecordController from '../controllers/billRecord.controller';
import billCtrl from '../controllers/bill.controller';
import Err from '../tools/error';
import { aclCheck } from '../controllers/role.controller';
const oneDay = 1 * 24 * 3600 * 1000;

export default {
  updateUserInfo: async (obj: any, req: IReq) => {
    logger.info({ _from: 'updateUserInfo', _by: req.user.id, ...obj });

    const _id = req.user.id;
    const { inviterCode, ...restObj } = obj;

    if (inviterCode) {
      const { inviter } = req.user;
      if (inviter) {
        throw new Error('inviter existed');
      }
      if (inviterCode === req.user.code) {
        throw new Error('cannot inviter yourself');
      }
      const user = await userCtrl.findById(req.user.id);
      if (!user) {
        throw Err.NotFound(
          `userid=${req.user.id}, username=${req.user.username}`
        );
      }
      if (user.inviter) {
        throw Err.Existed(`inviter=${user.inviter}`);
      }

      const inviterUser = await userCtrl.findUserByCode(inviterCode);

      restObj.inviter = inviterUser.id;
    }
    const updatedUser = await userCtrl.updateInfo(_id, restObj);

    const bill = await billCtrl.findById(updatedUser.billid);
    updatedUser.bill = bill;
    return updatedUser;
  },
  updateUserPassword: async (obj: any, req: IReq) => {
    logger.info({ _from: 'updateUserPassword', _by: req.user.id, ...obj });

    const { password, newPassword } = obj;

    const updatedUser = await userCtrl.updatePassword(
      req.user.id,
      password,
      newPassword
    );
    return updatedUser;
  },

  admin_updateUserStatus: async (obj: any, req: IReq) => {
    logger.info({ _from: 'admin_updateUserStatus', _by: req.user.id, ...obj });
    await aclCheck(req.user, 'admin_updateUserStatus');

    const { _id = 0, status = 0 } = obj;
    const updateUser = await userCtrl.updateStatus(_id, status);
    return updateUser;
  },
  admin_userList: async (obj: any, req: IReq) => {
    logger.info({ _from: 'admin_userList', _by: req.user.id, ...obj });
    await aclCheck(req.user, 'admin_userList');

    const userListObj = await userCtrl.find(obj);
    return userListObj;
  }
};
