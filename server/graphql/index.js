
const Query = require('./Query.js')
const user = require('./user.js')
const store = require('./store.js')

const billRecord = require('./billRecord')
const task = require('./task')

const rule = require('./rule')


const safeMerge = (...objList) => {
    var merged = {}

    for (let obj of objList) {
        Object.keys(obj).forEach(key => {
            if (merged[key]) {
                throw new Error('merge obj with repeated key')
            }
            merged[key] = obj[key]
        })
    }
    return merged
}

module.exports = safeMerge(
    Query,

    user,
    store,
    billRecord,
    task,
)