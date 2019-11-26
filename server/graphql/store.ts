import { IReq } from '../config/passport';

import storeCtrl from '../controllers/store.controller';
import logger from '../tools/logger';
import { Status } from '../models/store.model';
import { aclCheck } from '../controllers/role.controller';

export default {
  bindStore: async (obj: any, req: IReq) => {
    logger.info({ _from: 'bindStore', _by: req.user.id, ...obj });

    let store = await storeCtrl.insert({
      ...obj,
      status: Status.DEFAULT,
      userid: req.user.id
    });
    return store;
  },
  removeStore: async (obj: any, req: IReq) => {
    // todo remove relative  task and  bill, etc.
    logger.info({ _from: 'removeStore', _by: req.user.id, ...obj });

    const check = await storeCtrl.findById(obj._id);

    if (check.userid !== req.user.id) {
      throw new Error('not allowed');
    }
    if (check.status === Status.OK) {
      throw new Error('the store is checked');
    }

    let store = await storeCtrl.remove(obj._id);
    return store;
  },
  storeList: async (obj: any, req: IReq) => {
    logger.info({ _from: 'storeList', _by: req.user.id, ...obj });

    const storeList = await storeCtrl.findAll({ userid: req.user.id });
    return storeList;
  },

  updateStoreInfo: async (obj: any, req: IReq) => {
    logger.info({ _from: 'updateStoreInfo', _by: req.user.id, ...obj });

    const { _id, ...updateObj } = obj;
    const updateStore = await storeCtrl.updateInfo(_id, updateObj);
    return updateStore;
  },

  async admin_updateStoreStatus(obj: any, req: IReq) {
    logger.info({ _from: 'admin_updateStoreStatus', _by: req.user.id, ...obj });
    await aclCheck(req.user, 'admin_updateStoreStatus');

    const { _id, status, message } = obj;
    const updateStore = await storeCtrl.updateStatus(_id, status, message);
    return updateStore;
  },
  admin_storeList: async (obj: any, req: IReq) => {
    logger.info({ _from: 'admin_storeList', _by: req.user.id, ...obj });
    await (req.user, 'admin_storeList');

    const storeListObj = await storeCtrl.find(obj);
    return storeListObj;
  }
};
