const mongoose = require('mongoose');
const Int32 = require('mongoose-int32')

const StoreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    userid: {
        type: String,
        required: true,
    },
    type: {
        type: String,
    },
    website: {
        type: String,
    },

    wangwang: {
        type: String,
    },

    storeScreenShotImage: {
        type: String,
    },

    address: {
        type: String,
    },

    contactPhone: {
        type: String,
    },

    status: {
        type: Number,
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


module.exports = mongoose.model('Store', StoreSchema);
