const axios = require('axios');
const fs = require('fs')
const path = require('path')
const config = require('./_config')

const _token = fs.readFileSync(
  path.join(__dirname, '_token'),
  "utf8"
)
const baseURL = 'http://localhost:4040'
// baseURL: 'http://101.132.64.25:60000',


module.exports = function Client() {

  return {
    post: async (url, params) => {
      try {
        const instance = axios.create({
          baseURL,
          timeout: 2000,
          headers: { 'x-lmc-token': config.token }
        });
        let res = await instance.post(url, params)
        return res
      } catch (e) {
        return e.response
      }
    },
    get: async (url) => {

      try {
        const instance = axios.create({
          baseURL,
          timeout: 2000,
          headers: { 'x-lmc-token': config.token }
        });
        let res = await instance.get(url)
        return res
      } catch (e) {
        return e.response
      }
    }
  }
}