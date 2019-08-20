import { IReq } from '../config/passport';

import storeCtrl from '../controllers/store.controller'
import logger from '../tools/logger';





export default {
  bindStore: async (obj: any, req: IReq) => {
    logger.info({ _from: 'bindStore', _by: req.user.id, ...obj })

    let store = await storeCtrl.insert({ ...obj, userid: req.user.id })
    return store
  },

  updateStoreInfo: async (obj: any, req: IReq) => {
    logger.info({ _from: 'updateStoreInfo', _by: req.user.id, ...obj })

    const { _id, ...updateObj } = obj
    const updateStore = await storeCtrl.updateInfo(_id, updateObj)
    return updateStore
  },

  updateStoreStatus: async (obj: any, req: IReq) => {
    logger.info({ _from: 'updateStoreStatus', _by: req.user.id, ...obj })

    const { _id = 0, status = 0 } = obj
    const updateStore = await storeCtrl.updateStatus(_id, status)
    return updateStore
  },
  storeList: async (obj: any, req: IReq) => {
    logger.info({ _from: 'updateStoreStatus', _by: req.user.id, ...obj })


    const storeListObj = await storeCtrl.find(obj)
    return storeListObj
  }
}