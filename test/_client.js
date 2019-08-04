const axios = require('axios');

const instance = axios.create({
    baseURL: 'http://localhost:4040',
    timeout: 2000,
    headers: { 'x-lmc-token': 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6W10sIl9pZCI6IjVkNDQxMDBhNWM2NTljNjUzODg1NTAyOCIsInVzZXJuYW1lIjoiMTg4MTc1NzA3NDMiLCJoYXNoZWRQYXNzd29yZCI6IiQyYiQxMCRSa3FmY2dTLnNEUmRJeDZ6RUk2RVRlVjVlSGptZWdTRVdKdDN6ZndkSi5JcXpKd2FEZ25yaSIsImNyZWF0ZWRBdCI6IjIwMTktMDgtMDJUMTA6Mjc6MjIuOTUzWiJ9.MrCpAa07Ng3DeN7hadiF2HETaYCXHLXvi98SoO4dZpk' }
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

