import { IReq } from '../config/passport';
import logger from '../tools/logger';

import billRecordCtrl from '../controllers/billRecord.controller'

import { Type, Status } from '../models/billRecord.model'
// import acl from './acl'


export default {
  newBillRecord: async (obj: any, req: IReq) => {
    logger.info({ _from: 'newBillRecord', _by: req.user.id, ...obj })

    const { type } = obj
    const userid = req.user.id
    switch (type) {
      case Type.DEFAULT: {
        const record = await billRecordCtrl.insert({ ...obj, status: Status.DEFAULT, userid })
        return record

      }
      case Type.WITHDRAW: {
        const record = await billRecordCtrl.insert({ ...obj, status: Status.DEFAULT, userid })
        return record

      }

      default:
        throw new Error('invalid type')
    }

  },

  checkBillRecord: async (obj: any, req: IReq) => {
    logger.info({ _from: 'checkBillRecord', _by: req.user.id, ...obj })

    const { _id } = obj
    if (!_id) {
      throw new Error("invalid _id")
    }

    const record = await billRecordCtrl.check({ _id, status: obj.status })

    return record

  }
}