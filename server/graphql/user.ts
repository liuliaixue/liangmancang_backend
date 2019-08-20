//todo acl check
// const requireAdmin = () => { }
import userCtrl from '../controllers/user.controller'
import logger from '../tools/logger';
import { IReq } from '../config/passport';

export default {

  updateUserInfo: async (obj: any, req: IReq) => {
    logger.info({ _from: 'updateUserInfo', _by: req.user.id, ...obj })


    const _id = req.user.id
    const updatedUser = await userCtrl.updateInfo(_id, obj)
    return updatedUser
  },

  updateUserStatus: async (obj: any, req: IReq) => {
    logger.info({ _from: 'updateUserStatus', _by: req.user.id, ...obj })


    const { _id = 0, status = 0 } = obj
    const updateUser = await userCtrl.updateStatus(_id, status)
    return updateUser
  },
  userList: async (obj: any, req: IReq) => {
    
    logger.info({ _from: 'userList', _by: req.user.id, ...obj })


    const userListObj = await userCtrl.find(obj)
    return userListObj
  }
}