const userCtrl = require('../controllers/user.controller');
const storeCtrl = require('../controllers/store.controller')


module.exports = {
    // todo remove test
    user: async (_id, req) => {
        logger.info({ _from: 'user', _by: req.user.id, _id })

        const user = await userCtrl.findById({ _id: _id })

        return user
    },
    store: async (_id, req) => {
        logger.info({ _from: 'store', _by: req.user.id, _id })

        const store = await storeCtrl.findById({ _id: _id })

        return store
    }

}