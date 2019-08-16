const storeCtrl = require('../controllers/store.controller');





module.exports = {
    bindStore: async (obj, req) => {

        let store = await storeCtrl.insert({ ...obj, userid: req.user.id })
        return store
    },

    updateStoreInfo: async (obj, req) => {

        const { _id, ...updateObj } = obj
        const updateStore = await storeCtrl.updateInfo(_id, updateObj)
        return updateStore
    },

    updateStoreStatus: async (obj, req) => {
        const { _id = 0, status = 0 } = obj
        const updateStore = await storeCtrl.updateStatus(_id, status)
        return updateStore
    },
    storeList: async (obj, req) => {
        const storeListObj = await storeCtrl.find(obj)
        return storeListObj
    }
}