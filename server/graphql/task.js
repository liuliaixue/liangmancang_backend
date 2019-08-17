
const taskCtrl = require('../controllers/task.controller');

module.exports = {
    createTask: async (obj, req) => {
        logger.info({ _from: 'createOrUpdateTask', ...obj })


        const task = await taskCtrl.insert({ ...obj, userid: req.user.id })

        return task



    },
    updateTaskInfo: async () => {
        logger.info({ _from: 'updateTaskInfo', ...obj })

    },
    startTask: async (obj, req) => {
        logger.info({ _from: 'startTask', ...obj })
    },

    updateTaskStatus: async (obj, req) => {
        logger.info({ _from: 'updateTaskStatus', ...obj })
    }
}