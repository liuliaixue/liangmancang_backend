import { IReq } from '../config/passport';
import logger from '../tools/logger';

import billRecordCtrl from '../controllers/billRecord.controller';

import { Type, Status } from '../models/billRecord.model';
import { aclCheck } from '../controllers/role.controller';
// import acl from './acl'

export default {
  admin_newBillRecord: async (obj: any, req: IReq) => {
    logger.info({ _from: 'admin_newBillRecord', _by: req.user.id, ...obj });
    await aclCheck(req.user, 'admin_newBillRecord');

    const { type } = obj;
    const userid = req.user.id;
    switch (type) {
      case Type.DEFAULT: {
        const record = await billRecordCtrl.insert({
          ...obj,
          status: Status.DEFAULT,
          userid
        });
        return record;
      }
      case Type.WITHDRAW: {
        const record = await billRecordCtrl.insert({
          ...obj,
          status: Status.DEFAULT,
          userid
        });
        return record;
      }

      default:
        throw new Error('invalid type');
    }
  },

  admin_checkBillRecord: async (obj: any, req: IReq) => {
    logger.info({ _from: 'admin_checkBillRecord', _by: req.user.id, ...obj });
    await aclCheck(req.user, 'admin_checkBillRecord');

    const { _id } = obj;
    if (!_id) {
      throw new Error('invalid _id');
    }

    const record = await billRecordCtrl.check({ _id, status: obj.status });

    return record;
  },

  billRecordList: async (obj: any, req: IReq) => {
    logger.info({ _from: 'billRecordList', _by: req.user.id, ...obj });

    const userid = req.user.id;

    const billRecordListObj = await billRecordCtrl.find({ ...obj, userid });

    return billRecordListObj;
  },
  async admin_billRecordList(obj: any, req: IReq) {
    logger.info({ _from: 'billRecordList', _by: req.user.id, ...obj });
    await aclCheck(req.user, 'admin_billRecordList');

    const billRecordListObj = await billRecordCtrl.find({ ...obj });

    return billRecordListObj;
  }
};
