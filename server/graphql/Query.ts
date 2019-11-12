import { IReq } from '../config/passport';
import logger from '../tools/logger';

import userCtrl from '../controllers/user.controller';
import storeCtrl from '../controllers/store.controller';
import checkInCtrl from '../controllers/checkIn.controller';
import billController from '../controllers/bill.controller';

export default {
  store: async (obj: any, req: IReq) => {
    logger.info({ ...obj, _from: 'store', _by: req.user.id });

    const store = await storeCtrl.findById(obj._id);

    return store;
  },

  checkIn: async (obj: any, req: IReq) => {
    logger.info({ ...obj, _from: 'checkIn', _by: req.user.id });

    const store = await checkInCtrl.findById(obj._id);

    return store;
  }
};
