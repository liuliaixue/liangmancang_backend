const mongoose = require('mongoose');
const Int32 = require('mongoose-int32')

const RuleSchema = new mongoose.Schema({
    buyerPercentage: Number,
    platformPercentage: Number,

    storePromotion: Number,
    buyerPromotion: Number,

    createdAt: Number,
    updatedAt: Number,

    keyword: Number,
    image: Number,
    userArea: Number,
    userAge: Number,
    userGender: Number,
    userLevel: Number,
    userAntCreditPay: Number,
    userCollection: Number,


    status: Number,
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


module.exports = mongoose.model('rule', RuleSchema);
