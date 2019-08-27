import logger from '../tools/logger';
import { IReq } from '../config/passport';

export default {
  reasonList: async (obj: any, req: IReq) => {
    logger.info({ _from: 'reasonList', _by: req.user.id, ...obj })

    return {
      list: [{
        _id: "1",
        content: "resaon 11"
      }, {
        _id: "2",
        content: "resaon 22"
      }],
      total: 2
    }
  }
}