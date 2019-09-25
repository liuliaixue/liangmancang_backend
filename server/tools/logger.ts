import winston from 'winston';
import { string } from 'joi';
import message from '../graphql/message';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  // defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({ filename: 'log/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'log/combined.log' })
  ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}
export interface IError {
  _from: string;
  message: any;
}
const info = (obj: any) => {
  obj._date = new Date();
  logger.info(JSON.stringify(obj));
};

const error = (obj: IError) => {
  logger.error(
    JSON.stringify({
      ...obj,
      _date: new Date()
    })
  );
};

export default { info, error };
