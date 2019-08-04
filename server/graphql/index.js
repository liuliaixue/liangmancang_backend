
const Query = require('./Query.js')


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
)