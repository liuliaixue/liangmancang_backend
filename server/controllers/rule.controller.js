const Joi = require('joi');
const Rule = require('../models/rule.model');


let currentRule = null
const getCurrentRule = async () => {
    if (currentRule) {
        return currentRule
    } else {
        const ruleList = await Rule.find({}, null, { sort: { _id: -1 }, limit: 1 })
        if (ruleList.length !== 1) {
            throw new Error('invalid rule')
        }
        currentRule = ruleList[0]._doc

    }
}
const refreshRule = async () => {
    const ruleList = await Rule.find({}, null, { sort: { _id: -1 }, limit: 1 })
    if (ruleList.length !== 1) {
        throw new Error('invalid rule')
    }
    currentRule = ruleList[0]._doc
}

setInterval(() => {
    refreshRule()
    // console.log(currentRule)
}, 1000)

const insert = async () => {

}

module.exports = {
    getCurrentRule
}
