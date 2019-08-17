const mongoose = require('mongoose');
// const Int32 = require('mongoose-int32')

const BillSchema = new mongoose.Schema({

    userid: {
        type: String,
        required: true,
        unique: true,
    },
    total: {
        type: Number,
        required: true,
    },
    remained: {
        type: Number,
        required: true,
    },
    freeze: {
        type: Number,
        required: true,
    },
    withdraw: {
        type: Number,
        required: true,
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


module.exports = mongoose.model('Bill', BillSchema);
