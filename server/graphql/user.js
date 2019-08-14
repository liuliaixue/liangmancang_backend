const userCtrl = require('../controllers/user.controller');
//todo acl check
const requireAdmin = () => { }



module.exports = {

    updateUserInfo: async (obj, req) => {

        const _id = req.user._id
        const updatedUser = await userCtrl.updateInfo(_id, obj)
        return updatedUser
    },

    updateUserStatus: async (obj, req) => {
        const { _id = 0, status = 0 } = obj
        const updateUser = await userCtrl.updateStatus(_id, status)
        return updateUser
    },
    userList: async (obj, req) => {
        const userListObj = await userCtrl.find(obj)
        return userListObj
    }
}