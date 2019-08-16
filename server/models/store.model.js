const mongoose = require('mongoose');

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
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },


}, {
        versionKey: false
    });


module.exports = mongoose.model('Store', StoreSchema);
