import { IReq } from '../config/passport';
import logger from '../tools/logger';

import userCtrl from '../controllers/user.controller';
import storeCtrl from '../controllers/store.controller';
import checkInCtrl from '../controllers/checkIn.controller';

export default {
  // todo remove test
  user: async (obj: any, req: IReq) => {
    logger.info({ _from: 'user', _by: req.user.id, ...obj });
    const userid = obj._id || req.user.id;
    const user = await userCtrl.findById(userid);

    return user;
  },
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
