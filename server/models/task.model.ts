const mongoose = require('mongoose');
const Int32 = require('mongoose-int32')

const TaskSchema = new mongoose.Schema({
    parent: {
        type: String,
    },
    orderNumber: {
        type: String,
    },

    goodsName: {
        type: String,
    },
    goodsLink: {
        type: String,
    },
    goodsImage: {
        type: String,
    },
    goodsPrice: {
        type: Number,
    },
    amount: {
        type: Number,
    },
    goodsPriceShowed: {
        type: Number,
    },
    specification: {
        type: String,
    },
    isFreeShipping: {
        type: Boolean,
    },
    howToFindTask: {
        type: String,
    },


    startTime: {
        type: Number,
    },
    endTime: {
        type: Number,
    },
    total: {
        type: Number,
    },

    commission: {
        type: Number,
    },
    platformServiceFee: {
        type: Number,
    },
    platformCommission: {
        type: Number,
    },

    extraCommission: {
        type: Number,
    },
    extraImages: {
        type: [String],
    },
    remark: {
        type: String,
    },



    status: {
        type: Number,
    },

    storeid: {
        type: String,
    },
    userid: {
        type: String,
    },
    workerid: {
        type: String,
    },


    createdAt: {
        type: Number,
        default: 0
    },
    updatedAt: {
        type: Number,
        default: 0
    },
}, {
        versionKey: false
    });


const Status = {
    DEFAULT: 0,
    ASSIGNED: 1,
    APPEAL: 2,
    FINISHED: 3,
}

module.exports = mongoose.model('Task', TaskSchema);

module.exports.Status = Status