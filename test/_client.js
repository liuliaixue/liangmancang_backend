const axios = require('axios');
const fs = require('fs');
const path = require('path');
const config = require('./_config');
const { baseURL } = config;

module.exports = function Client() {
  return {
    post: async (url, params) => {
      try {
        const instance = axios.create({
          baseURL,
          timeout: 2000
        });
        let res = await instance.post(url, params);
        return res;
      } catch (e) {
        return e.response;
      }
    },
    get: async url => {
      try {
        const instance = axios.create({
          baseURL,
          timeout: 2000
        });
        let res = await instance.get(url);
        return res;
      } catch (e) {
        return e.response;
      }
    }
  };
};
