const billRecordCtrl = require('../controllers/billRecord.controller');

const { Type, Status } = require('../models/billRecord.model')

// const Type = {
//     DEFAULT: 0,
//     PROMOTION: 1,
//     TASK_LOCK: 2,
//     TASK_REFUNK: 3,
//     TASK_PAYMENT: 4,
//     REFUND: 5


// }
// const Status = {
//     DEFAULT: 0,
//     CHECKED: 1
// }

// const { Type, Status } = billRecordCtrl

module.exports = {
    billRecord: async (obj, req) => {
        logger.info({ _from: 'billRecord', _by: req.user.id, ...obj })

        const { type } = obj
        const userid = req.user.id
        switch (type) {
            case Type.DEFAULT:
                const record = await billRecordCtrl.insert({ ...obj, status: 0, userid })
                return record
            case Type.WITHDRAW:
                throw "unsupported"
                return
            default:
                throw new Error('invalid type')
        }

    },

    billRecordCheck: async (obj, req) => {
        logger.info({ _from: 'updateBillRecordStatus', _by: req.user.id, ...obj })

        const { _id } = obj
        if (!_id) {
            throw new Error("invalid _id")
        }

        const record = await billRecordCtrl.check({ _id })

        return record



    }
}