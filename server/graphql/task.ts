import { IReq } from '../config/passport';
import logger from '../tools/logger';

import taskCtrl from '../controllers/task.controller'

import { Status } from '../models/task.model'

export default {
  createTask: async (obj: any, req: IReq) => {
    logger.info({ _from: 'createOrUpdateTask', _by: req.user.id, ...obj })


    const task = await taskCtrl.insert({ ...obj, userid: req.user.id })

    return task



  },
  // updateTaskInfo: async () => {
  //     logger.info({ _from: 'updateTaskInfo', _by: req.user.id, ...obj })

  // },
  // startTask: async (obj:any, req:IReq) => {
  //     logger.info({ _from: 'startTask', _by: req.user.id, ...obj })

  //     if (!obj._id) {
  //         throw new Error('invalid _id')
  //     }

  // },

  updateTaskStatus: async (obj: any, req: IReq) => {
    logger.info({ _from: 'updateTaskStatus', _by: req.user.id, ...obj })


    if (!obj._id) {
      throw new Error('invalid _id')
    }
    if (!obj.status) {
      throw new Error('invalid status')
    }

    switch (obj.status) {
      // start task
      case Status.ASSIGNED: {
        const updatedTask = await taskCtrl.updateWorker(
          obj._id,
          req.user.id)

        return updatedTask
      }
      // appeal task
      case Status.APPEAL: {
        const updatedTask = await taskCtrl.updateStatus(
          obj._id,
          Status.APPEAL)

        return updatedTask
      }
      // finish task
      case Status.FINISHED: {

        const updatedTask = await taskCtrl.finish(obj._id)
        return updatedTask
      }
      default:
        throw new Error('invalid status, only APPEAL and FINISHED are allowed')
    }

  },

}