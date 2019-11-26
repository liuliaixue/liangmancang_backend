import { IReq } from '../config/passport';
import logger from '../tools/logger';

import taskCtrl from '../controllers/task.controller';
import orderCtrl from '../controllers/order.controller';

import Task, { Status } from '../models/task.model';
import { aclCheck } from '../controllers/role.controller';
import Err from '../tools/error';
import { Status as OrderStatus } from '../models/order.model';

export default {
  task: async (obj: any, req: IReq) => {
    logger.info({ _from: 'task', _by: req.user.id, ...obj });

    const task = await taskCtrl.findById(obj._id);

    return task;
  },
  // 创建父亲任务, 后台在worker中创建子任务
  newTask: async (obj: any, req: IReq) => {
    logger.info({ _from: 'newTask', _by: req.user.id, ...obj });

    const task = await taskCtrl.newTask({ ...obj, userid: req.user.id });

    return task;
  },

  // updateTaskStatus: async (obj: any, req: IReq) => {
  //   logger.info({ _from: 'updateTaskStatus', _by: req.user.id, ...obj });

  //   if (!obj._id) {
  //     throw new Error('invalid _id');
  //   }
  //   if (!obj.status) {
  //     throw new Error('invalid status');
  //   }

  //   switch (obj.status) {
  //     // start task
  //     case Status.ASSIGNED: {
  //       const updatedTask = await taskCtrl.updateWorker(obj._id, req.user.id);

  //       return updatedTask;
  //     }
  //     // finish task
  //     case Status.FINISHED: {
  //       // todo check bill
  //       const updatedTask = await taskCtrl.finish(obj._id);
  //       return updatedTask;
  //     }
  //     // appeal task
  //     case Status.APPEAL: {
  //       const updatedTask = await taskCtrl.updateStatus(obj._id, Status.APPEAL);
  //       return updatedTask;
  //     }

  //     case Status.ABORT: {
  //       // todo check bill
  //       const updatedTask = await taskCtrl.abort(obj._id);
  //       return updatedTask;
  //     }
  //     default:
  //       throw new Error('invalid status, only APPEAL and FINISHED are allowed');
  //   }
  // },

  taskList: async (obj: any, req: IReq) => {
    logger.info({ _from: 'taskList', _by: req.user.id, ...obj });

    const userid = req.user.id;
    const taskListObj = await taskCtrl.find({ ...obj, userid });

    return taskListObj;
  },
  taskWithStoreList: async (obj: any, req: IReq) => {
    logger.info({ _from: 'taskWithStoreList', _by: req.user.id, ...obj });

    const userid = req.user.id;
    const taskListObj = await taskCtrl.findWithStore({ ...obj, userid });

    return taskListObj;
  },

  admin_taskList: async (obj: any, req: IReq) => {
    logger.info({ _from: 'admin_taskList', _by: req.user.id, ...obj });
    await aclCheck(req.user, 'admin_taskList');

    const taskListObj = await taskCtrl.find({ ...obj });

    return taskListObj;
  },
  updateTaskInfo: async (obj: any, req: IReq) => {
    logger.info({ _from: 'updateTaskInfo', _by: req.user.id, ...obj });

    const { _id, ...updateObj } = obj;

    const taskListObj = await taskCtrl.updateInfo(obj._id, {
      ...updateObj,
      userid: req.user.id
    });

    return taskListObj;
  },
  confirmTask: async (obj: any, req: IReq) => {
    logger.info({ _from: 'confirmTask', _by: req.user.id, ...obj });

    const check = await Task.findById(obj._id);
    if (!check) {
      throw new Error('task not found');
    }
    if (req.user.id !== check.userid) {
      throw new Error('not alllowed');
    }
    const updatedTask = await taskCtrl.confirm(obj._id);

    return updatedTask;
  },
  admin_updateTaskStatus: async (obj: any, req: IReq) => {
    logger.info({ _from: 'admin_updateTaskStatus', _by: req.user.id, ...obj });
    await aclCheck(req.user, 'admin_updateTaskStatus');
    if (obj.status === Status.CHECKED) {
      const task = await taskCtrl.check(obj._id);
      return task;
    }
    if (obj.status === Status.BAD) {
      const task = await taskCtrl.reject(obj._id, obj.message);
      return task;
    }
    throw new Error('invalid status, only CHECKED and BAD are supported ');
  },
  orderList: async (obj: any, req: IReq) => {
    logger.info({ _from: 'orderList', _by: req.user.id, ...obj });

    const orderListObj = await orderCtrl.find({ ...obj, userid: req.user.id });

    return orderListObj;
  },
  admin_orderList: async (obj: any, req: IReq) => {
    logger.info({ _from: 'admin_orderList', _by: req.user.id, ...obj });
    await aclCheck(req.user, 'admin_updateTaskStatus');

    const orderListObj = await orderCtrl.find(obj);

    return orderListObj;
  },
  updateOrderStatus: async (obj: any, req: IReq) => {
    logger.info({ _from: 'updateOrderStatus', _by: req.user.id, ...obj });

    if (!obj._id) {
      throw new Error('invalid _id');
    }

    switch (obj.status) {
      case OrderStatus.DEFAULT: {
        //todo
        break;
      }
      case OrderStatus.ASSIGNED: {
        const updatedOrder = await orderCtrl.updateWorker(obj._id, req.user.id);
        return updatedOrder;
      }
      case OrderStatus.CONFIRM: {
        const updatedOrder = await orderCtrl.updateStatus(
          obj._id,
          OrderStatus.CONFIRM
        );
        return updatedOrder;
      }
      case OrderStatus.FINISHED: {
        const updatedOrder = await orderCtrl.finish(obj._id);
        return updatedOrder;
      }
      case OrderStatus.ABORT: {
        //todo
        break;
      }
      default: {
        throw new Error('invalid status, only APPEAL and FINISHED are allowed');
      }
    }
  }
  // childTaskList: async (obj: any, req: IReq) => {
  //   logger.info({ _from: 'childTaskList', _by: req.user.id, ...obj });

  //   const childTaskList = await taskCtrl.findChildTaskList(obj);

  //   return childTaskList;
  // },
  // admin_childTaskList: async (obj: any, req: IReq) => {
  //   logger.info({ _from: 'admin_childTaskList', _by: req.user.id, ...obj });
  //   await aclCheck(req.user, 'admin_childTaskList');

  //   const childTaskList = await taskCtrl.findChildTaskList(obj);

  //   return childTaskList;
  // }
};
