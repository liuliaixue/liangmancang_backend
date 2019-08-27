import logger from '../tools/logger';
import { IReq } from '../config/passport';
import messageCtrl from "../controllers/message.controller"

export default {
  newMessage: async (obj: any, req: IReq) => {
    logger.info({ _from: 'newMessage', _by: req.user.id, ...obj })

    const message = await messageCtrl.newMessage({ ...obj, userid: req.user.id })
    return message
  },

  updateMessage: async (obj: any, req: IReq) => {
    logger.info({ _from: 'updateMessage', _by: req.user.id, ...obj })

    const { _id, ...res } = obj
    const updatedMessage = await messageCtrl.update(_id, res)
    return updatedMessage
  },

  messageList: async (obj: any, req: IReq) => {
    logger.info({ _from: 'messageList', _by: req.user.id, ...obj })

    const listObj = await messageCtrl.find(obj)

    return listObj
  }
}