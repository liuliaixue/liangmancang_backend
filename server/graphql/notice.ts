import { IReq } from '../config/passport';
import logger from '../tools/logger';
import noticeCtronller from '../controllers/notice.controller';
import ID from '../models/id.model';

export default {
  admin_newNotice: async (obj: any, req: IReq) => {
    logger.info({ _from: 'admin_newNotice', _by: req.user.id, ...obj });

    const notice = await noticeCtronller.newNotice({
      ...obj,
      userid: req.user.id
    });

    return notice;
  },
  admin_updateNotice: async (obj: any, req: IReq) => {
    logger.info({ _from: 'admin_updateNotice', _by: req.user.id, ...obj });

    const { _id, ...restObj } = obj;
    const updatedNotice = await noticeCtronller.update(_id, restObj);
    return updatedNotice;
  },
  admin_removeNotice: async (obj: any, req: IReq) => {
    logger.info({ _from: 'admin_removeNotice', _by: req.user.id, ...obj });

    const { _id } = obj;
    const res = await noticeCtronller.remove(_id);

    return res;
  },
  notice: async (obj: any, req: IReq) => {
    logger.info({ _from: 'notice', _by: req.user.id, ...obj });

    const res = await noticeCtronller.findById(obj._id);
    return res;
  },
  noticeList: async (obj: any, req: IReq) => {
    logger.info({ _from: 'noticeList', _by: req.user.id, ...obj });

    const listObj = await noticeCtronller.find(obj);

    return listObj;
  }
};
