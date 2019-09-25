import { IReq } from '../config/passport';
import logger from '../tools/logger';

import taskCtrl from '../controllers/task.controller';

import { Status } from '../models/task.model';
import { aclCheck } from '../controllers/role.controller';
import Err from '../tools/error';

export default {
  // 创建父亲任务, 后台在worker中创建子任务
  newTask: async (obj: any, req: IReq) => {
    logger.info({ _from: 'newTask', _by: req.user.id, ...obj });

    // const task = await taskCtrl.insert({ ...obj, userid: req.user.id })
    const task = await taskCtrl.newTask({ ...obj, userid: req.user.id });

    return task;
  },

  updateTaskStatus: async (obj: any, req: IReq) => {
    logger.info({ _from: 'updateTaskStatus', _by: req.user.id, ...obj });

    if (!obj._id) {
      throw new Error('invalid _id');
    }
    if (!obj.status) {
      throw new Error('invalid status');
    }

    switch (obj.status) {
      // start task
      case Status.ASSIGNED: {
        const updatedTask = await taskCtrl.updateWorker(obj._id, req.user.id);

        return updatedTask;
      }
      // finish task
      case Status.FINISHED: {
        // todo check bill
        const updatedTask = await taskCtrl.finish(obj._id);
        return updatedTask;
      }
      // appeal task
      case Status.APPEAL: {
        const updatedTask = await taskCtrl.updateStatus(obj._id, Status.APPEAL);
        return updatedTask;
      }

      case Status.ABORT: {
        // todo check bill
        const updatedTask = await taskCtrl.abort(obj._id);
        return updatedTask;
      }
      default:
        throw new Error('invalid status, only APPEAL and FINISHED are allowed');
    }
  },

  taskList: async (obj: any, req: IReq) => {
    logger.info({ _from: 'taskList', _by: req.user.id, ...obj });

    const userid = req.user.id;
    const taskListObj = await taskCtrl.find({ ...obj, userid });

    return taskListObj;
  },

  childTaskList: async (obj: any, req: IReq) => {
    logger.info({ _from: 'childTaskList', _by: req.user.id, ...obj });

    const childTaskList = await taskCtrl.findChildTaskList(obj);

    return childTaskList;
  },
  admin_taskList: async (obj: any, req: IReq) => {
    logger.info({ _from: 'admin_taskList', _by: req.user.id, ...obj });
    await aclCheck(req.user, 'admin_taskList');

    const taskListObj = await taskCtrl.find({ ...obj, parent: obj.parent });

    return taskListObj;
  },
  admin_childTaskList: async (obj: any, req: IReq) => {
    logger.info({ _from: 'admin_childTaskList', _by: req.user.id, ...obj });
    await aclCheck(req.user, 'admin_childTaskList');

    const childTaskList = await taskCtrl.findChildTaskList(obj);

    return childTaskList;
  }
};
