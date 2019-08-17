const mongoose = require('mongoose');
// const Int32 = require('mongoose-int32')

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
    },
    hashedPassword: {
        type: String,
        required: true
    },
    //   email: {
    //     type: String,
    //     required: false,
    //     unique: false,
    //     // Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
    //     match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
    //   },
    fullname: {
        type: String,
        required: false
    },
    qq: {
        type: String,
        required: false
    },
    idCard: {
        type: String,
        required: false
    },
    bankCard: {
        type: String,
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

    roles: [{
        type: String,
    }]
}, {
        versionKey: false
    });


module.exports = mongoose.model('User', UserSchema);
