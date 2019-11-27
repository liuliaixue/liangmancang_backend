import Joi from 'joi';
import dotenv from 'dotenv';
import path from 'path';

// require and configure dotenv, will load vars in .env in PROCESS.ENV
dotenv.config({
  path: path.join(__dirname, '../../.env')
});

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test', 'provision'])
    .default('development'),
  SERVER_PORT: Joi.number().default(4040),
  MONGOOSE_DEBUG: Joi.boolean().when('NODE_ENV', {
    is: Joi.string().equal('development'),
    then: Joi.boolean().default(true),
    otherwise: Joi.boolean().default(false)
  }),
  JWT_SECRET: Joi.string()
    .required()
    .description('JWT Secret required to sign'),
  MONGO_HOST: Joi.string()
    .required()
    .description('Mongo DB host url'),
  MONGO_PORT: Joi.number().default(27017),

  ALI_ACCESSKEY_ID: Joi.string().required(),
  ALI_ACCESSKEY_SECRET: Joi.string().required(),
  ALI_ROLEARN: Joi.string().required(),
  ALI_OSS_REGION: Joi.string().required(),
  ALI_OSS_BUCKET: Joi.string().required(),
  ALI_OSS_PREFIX: Joi.string().required()
})
  .unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  ak: 'C6zJv3pJd9NaHqodJom5QwacN50HopI9vbldfe1X',
  sk: 'HTOixXgmbsN8f9F8lRR7T9cnYelMoLgwm6m59Glj',
  qiuniuFilePrefix: 'http://pzxtt0qa8.bkt.clouddn.com',
  env: envVars.NODE_ENV,
  port: envVars.SERVER_PORT,
  mongooseDebug: envVars.MONGOOSE_DEBUG,
  jwtSecret: envVars.JWT_SECRET as string,
  frontend: envVars.MEAN_FRONTEND || 'angular',
  mongo: {
    host: envVars.MONGO_HOST,
    port: envVars.MONGO_PORT
  },

  ALI_ACCESSKEY_ID: envVars.ALI_ACCESSKEY_ID,
  ALI_ACCESSKEY_SECRET: envVars.ALI_ACCESSKEY_SECRET,
  ALI_ROLEARN: envVars.ALI_ROLEARN,
  ALI_OSS_REGION: envVars.ALI_OSS_REGION,
  ALI_OSS_BUCKET: envVars.ALI_OSS_BUCKET,
  ALI_OSS_PREFIX: envVars.ALI_OSS_PREFIX
};

export default config;
