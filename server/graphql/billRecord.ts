import { IReq } from '../config/passport';
import logger from '../tools/logger';

import billRecordCtrl from '../controllers/billRecord.controller'

import { Type, Status } from '../models/billRecord.model'
// import acl from './acl'


export default {
  createBillRecord: async (obj: any, req: IReq) => {
    logger.info({ _from: 'billRecord', _by: req.user.id, ...obj })

    const { type } = obj
    const userid = req.user.id
    switch (type) {
      case Type.DEFAULT:
        const record = await billRecordCtrl.insert({ ...obj, status: 0, userid })
        return record
      case Type.WITHDRAW:
        throw "unsupported"
        return
      default:
        throw new Error('invalid type')
    }

  },

  checkBillRecord: async (obj: any, req: IReq) => {
    logger.info({ _from: 'updateBillRecordStatus', _by: req.user.id, ...obj })

    const { _id } = obj
    if (!_id) {
      throw new Error("invalid _id")
    }

    const record = await billRecordCtrl.check({ _id, status: obj.status })

    return record

  }
}