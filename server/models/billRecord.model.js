const mongoose = require('mongoose');
// const Int32 = require('mongoose-int32')

const BillRecordSchema = new mongoose.Schema({

    userid: {
        type: String,
        required: true,
    },
    toUserid: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },

    type: {
        type: Number,
        required: false
    },
    status: {
        type: Number,
        required: false
    },


    createdAt: {
        type: Number,
        default: 0
    },
    updatedAt: {
        type: Number,
        default: 0
    },
    resultRecordid: {
        type: String
    }


}, {
        versionKey: false
    });


module.exports = mongoose.model('BillRecord', BillRecordSchema);


const Type = {
    DEFAULT: 0,
    PROMOTION: 1,
    TASK_LOCK: 2,
    TASK_REFUNK: 3,
    TASK_PAYMENT: 4,
    WITHDRAW: 5


}
const Status = {
    DEFAULT: 0,
    CHECKED: 1
}

module.exports.Type = Type
module.exports.Status = Status