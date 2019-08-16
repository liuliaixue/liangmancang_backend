const axios = require('axios');
const fs = require('fs')
const path = require('path')
const token = fs.readFileSync(
    path.join(__dirname, '_token'),
    "utf8"
)

const instance = axios.create({
    baseURL: 'http://localhost:4040',
    // baseURL: 'http://101.132.64.25:60000',
    timeout: 2000,
    headers: { 'x-lmc-token': token }
});

module.exports = {
    post: async (url, params) => {

        try {
            let res = await instance.post(url, params)
            return res
        } catch (e) {
            return e.response
        }
    },
    get: async (url) => {

        try {
            let res = await instance.get(url)
            return res
        } catch (e) {
            return e.response
        }
    }
}

