import config from '../config/config';
import qiniu from 'qiniu';
import logger from '../tools/logger';
import { IReq } from '../config/passport';
import moment from 'moment';
import shortid from '../tools/shortid';

const { ak, sk, qiuniuFilePrefix } = config;
const mac = new qiniu.auth.digest.Mac(ak, sk);

const genUploadToken = (filename: string) => {
  const key = `${moment().format(
    'YYYY-MM-DD'
  )}/${shortid.generate()}/${filename}`;
  const options = {
    scope: `shangbi2019:${key}`,
    returnBody: `{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"qiniu","url":"${qiuniuFilePrefix}/$(key)"}`
  };
  const putPolicy = new qiniu.rs.PutPolicy(options);
  const uploadToken = putPolicy.uploadToken(mac);
  return { key, uploadToken };
};

// console.log(genUploadToken(`17.jpg`));
// console.log(`${ moment().format()}` )

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
