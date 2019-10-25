import Query from './Query';
import user from './user';
import store from './store';
import bill from './bill';
import task from './task';
import rule from './rule';
import checkIn from './checkIn';
import reason from './reason';
import message from './message';
import role from './role';
import qiniu from './qiniu';
import logger from '../tools/logger';

interface IGraphqlObj {
  [key: string]: object;
}

const safeMerge = (objList: any) => {
  var merged: IGraphqlObj = {};

  for (let obj of objList) {
    Object.keys(obj).forEach((key: string) => {
      if (merged[key]) {
        throw new Error('merge obj with repeated key');
      }
      //merged[key] = obj[key];
      merged[key] = async (...arg: []) => {
        try {
          return await obj[key](...arg);
        } catch (e) {
          logger.error({ _from: 'graphql_root', message: e.message });
          throw e.message;
        }
      };
    });
  }
  return merged;
};

export default safeMerge([
  Query,
  user,
  store,
  bill,
  task,
  rule,
  checkIn,
  reason,
  message,
  qiniu
]);
