const userCtrl = require('../controllers/user.controller');


module.exports = {
    // todo remove test
    user: async (_id, req) => {
        logger.info({ _from: 'user', _id })

        const user = await userCtrl.findById({ _id: _id })

        return user
    },

}