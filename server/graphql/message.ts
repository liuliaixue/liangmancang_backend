import logger from '../tools/logger';
import { IReq } from '../config/passport';
import messageCtrl from '../controllers/message.controller';

export default {
  message: async (obj: any, req: IReq) => {
    logger.info({ _from: 'message', _by: req.user.id, ...obj });

    const message = await messageCtrl.findById(obj._id);
    return message;
  },

  newMessage: async (obj: any, req: IReq) => {
    logger.info({ _from: 'newMessage', _by: req.user.id, ...obj });

    const message = await messageCtrl.newMessage({
      ...obj,
      userid: req.user.id
    });
    return message;
  },

  removeMessage: async (obj: any, req: IReq) => {
    logger.info({ _from: 'removeMessage', _by: req.user.id, ...obj });

    const check = await messageCtrl.findById(obj._id);
    if (check.userid !== req.user.id) {
      throw new Error('not allowed');
    }

    let message = await messageCtrl.remove(obj._id);
    return message;
  },

  updateMessage: async (obj: any, req: IReq) => {
    logger.info({ _from: 'updateMessage', _by: req.user.id, ...obj });

    const { _id, ...res } = obj;
    const updatedMessage = await messageCtrl.update(_id, res);
    return updatedMessage;
  },

  messageList: async (obj: any, req: IReq) => {
    logger.info({ _from: 'messageList', _by: req.user.id, ...obj });

    const listObj = await messageCtrl.find(obj);

    return listObj;
  },
  chatList: async (obj: any, req: IReq) => {
    logger.info({ _from: 'chatList', _by: req.user.id, ...obj });

    const listObj = await messageCtrl.chatList({ ...obj, userid: req.user.id });

    return listObj;
  }
};
