import { IReq } from '../config/passport';
import logger from '../tools/logger';

import billCtrl from '../controllers/bill.controller';

import { Type, Status } from '../models/bill.model';
import { aclCheck } from '../controllers/role.controller';
// import acl from './acl'

export default {
  newBill: async (obj: any, req: IReq) => {
    logger.info({ _from: 'newBill', _by: req.user.id, ...obj });

    const { type } = obj;
    const userid = req.user.id;
    if (type !== Type.DEFAULT) {
      throw new Error('invalid type');
    }
    const record = await billCtrl.newBill({
      ...obj,
      toUserid: userid,
      status: Status.DEFAULT,
      userid
    });
    return record;
  },
  admin_newBill: async (obj: any, req: IReq) => {
    logger.info({ _from: 'admin_newBill', _by: req.user.id, ...obj });
    await aclCheck(req.user, 'admin_newBill');

    const { type, toUserid, amount } = obj;

    const userid = req.user.id;
    switch (type) {
      case Type.DEFAULT: {
        const record = await billCtrl.newBill({
          ...obj,
          type: Type.DEFAULT,
          amount,
          status: Status.DEFAULT,
          userid: toUserid
        });
        return record;
      }
      case Type.WITHDRAW: {
        const record = await billCtrl.newBill({
          ...obj,
          type: Type.WITHDRAW,
          amount,
          status: Status.DEFAULT,
          userid: toUserid
        });
        return record;
      }

      default:
        throw new Error('invalid type');
    }
  },

  admin_checkBill: async (obj: any, req: IReq) => {
    logger.info({ _from: 'admin_checkBill', _by: req.user.id, ...obj });
    await aclCheck(req.user, 'admin_bill_check');

    const { _id } = obj;
    if (!_id) {
      throw new Error('invalid _id');
    }

    const record = await billCtrl.check(_id);

    return record;
  },

  billList: async (obj: any, req: IReq) => {
    logger.info({ _from: 'billList', _by: req.user.id, ...obj });

    const userid = req.user.id;

    const billListObj = await billCtrl.find({ ...obj, userid });

    return billListObj;
  },
  async admin_billList(obj: any, req: IReq) {
    logger.info({ _from: 'admin_billList', _by: req.user.id, ...obj });
    await aclCheck(req.user, 'admin_bill_list');

    const billListObj = await billCtrl.find({ ...obj });

    return billListObj;
  }
};
