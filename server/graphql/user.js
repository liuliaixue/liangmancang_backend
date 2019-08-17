const userCtrl = require('../controllers/user.controller');
//todo acl check
const requireAdmin = () => { }



module.exports = {

    updateUserInfo: async (obj, req) => {
        logger.info({ _from: 'updateUserInfo',_by: req.user.id,  ...obj })


        const _id = req.user.id
        const updatedUser = await userCtrl.updateInfo(_id, obj)
        return updatedUser
    },

    updateUserStatus: async (obj, req) => {
        logger.info({ _from: 'updateUserStatus', _by: req.user.id, ...obj })


        const { _id = 0, status = 0 } = obj
        const updateUser = await userCtrl.updateStatus(_id, status)
        return updateUser
    },
    userList: async (obj, req) => {
        logger.info({ _from: 'userList',_by: req.user.id,  ...obj })


        const userListObj = await userCtrl.find(obj)
        return userListObj
    }
}