import { IReq } from '../config/passport';
import logger from '../tools/logger';


import userCtrl from '../controllers/user.controller'
import storeCtrl from '../controllers/store.controller'

export default {
  // todo remove test
  user: async (_id: string, req: IReq) => {
    logger.info({ _from: 'user', _by: req.user.id, _id })

    const user = await userCtrl.findById({ _id: _id })

    return user
  },
  store: async (_id: string, req: IReq) => {
    logger.info({ _from: 'store', _by: req.user.id, _id })

    const store = await storeCtrl.findById({ _id: _id })

    return store
  }

}