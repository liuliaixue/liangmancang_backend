import config from '../config/config';
import qiniu from 'qiniu';
import logger from '../tools/logger';
import { IReq } from '../config/passport';

const { ak, sk } = config;
const mac = new qiniu.auth.digest.Mac(ak, sk);

const genUploadToken = (filename: string) => {
  const options = {
    scope: `shangbi2019:${filename}`
  };
  const putPolicy = new qiniu.rs.PutPolicy(options);
  const uploadToken = putPolicy.uploadToken(mac);
  return uploadToken;
};

// console.log(genUploadToken(`17.jpg`));

export default {
  uploadFileToken: async (obj: any, req: IReq) => {
    logger.info({ _from: 'uploadFileToken', _by: req.user.id, ...obj });

    if (typeof obj.filename !== 'string') {
      throw new Error('invalid filename');
    }
    const token = genUploadToken(obj.filename);

    return token;
  }
};
