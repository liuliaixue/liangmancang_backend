import config from '../config/config';
import logger from '../tools/logger';
import { IReq } from '../config/passport';
import moment from 'moment';
import shortid from '../tools/shortid';

const {
  ALI_ACCESSKEY_ID,
  ALI_ACCESSKEY_SECRET,
  ALI_ROLEARN,
  ALI_OSS_REGION,
  ALI_OSS_BUCKET,
  ALI_OSS_PREFIX
} = config as any;

if (
  !ALI_ACCESSKEY_ID ||
  !ALI_ACCESSKEY_SECRET ||
  !ALI_ROLEARN ||
  !ALI_OSS_REGION ||
  !ALI_OSS_BUCKET ||
  !ALI_OSS_PREFIX
) {
  throw new Error('config error, check .env');
}

const policy = {
  Statement: [
    {
      Effect: 'Allow',
      Action: [
        'oss:GetObject',
        'oss:PutObject',
        'oss:InitiateMultipartUpload',
        'oss:UploadPart',
        'oss:UploadPartCopy',
        'oss:CompleteMultipartUpload',
        'oss:AbortMultipartUpload',
        'oss:ListMultipartUploads',
        'oss:ListParts'
      ],
      Resource: ['acs:oss:*:*:lmc-2019', 'acs:oss:*:*:lmc-2019/*']
    }
  ],
  Version: '1'
};

let OSS = require('ali-oss');
let STS = OSS.STS;
let sts = new STS({
  secure: true,
  accessKeyId: ALI_ACCESSKEY_ID,
  accessKeySecret: ALI_ACCESSKEY_SECRET
});

async function getUploadOssToken(filename: string, userid: string) {
  const key = `${moment().format(
    'YYYY-MM-DD'
  )}/${shortid.generate()}/${filename}`;

  const token = await sts.assumeRole(
    ALI_ROLEARN,
    policy,
    15 * 60,
    userid || 'none'
  );
  return {
    region: ALI_OSS_REGION,
    bucket: ALI_OSS_BUCKET,
    key,
    url: `${ALI_OSS_PREFIX}/${key}`,

    accessKeyId: token.credentials.AccessKeyId,
    accessKeySecret: token.credentials.AccessKeySecret,
    stsToken: token.credentials.SecurityToken
  };
}

export default {
  async ossUploadToken(obj: any, req: IReq) {
    logger.info({ _from: 'uploadFileToken', _by: req.user.id, ...obj });

    if (typeof obj.filename !== 'string') {
      throw new Error('invalid filename');
    }

    const token = await getUploadOssToken(obj.filename, req.user.id);
    return token;
  }
};
