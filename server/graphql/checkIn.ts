import checkInCtrl from '../controllers/checkIn.controller'
import { IReq } from '../config/passport';
import logger from '../tools/logger';

export default {
  newCheckIn: async (obj: any, req: IReq) => {
    logger.info({ _from: 'newCheckIn', _by: req.user.id, ...obj })


    const _id = req.user.id
    const checkIn = await checkInCtrl.newCheckIn(_id)

    return checkIn
  },

  checkInList: async (obj: any, req: IReq) => {
    logger.info({ _from: 'checkInList', _by: req.user.id, ...obj })


    const checkInListObj = await checkInCtrl.find({ ...obj })
    return checkInListObj
  }

}