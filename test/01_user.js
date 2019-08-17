
const config = require('./_config')
const assert = require('assert')
const client = require('./_client')

describe('User', function () {
    it('register', async () => {
        const user = {
            username: '18817570747',
            password: '123456',

            mobileNumber: '18817570743',
        }
        const res = await client.post('/api/auth/register', user)
        assert(res.data.user.username === user.username)
    });

    // it('register fail with same username', async () => {
    //     let res = await client.post('/api/auth/register', {
    //         username: '18817570743',
    //         password: '123456',

    //         mobileNumber: '18817570743',
    //     });
    //     assert(res.status === 500)

    // });

    it('login', async () => {
        const res = await client.post('/api/auth/login', {
            username: '18817570747',
            password: '123456',
        })
        assert(res.data.user.username === '18817570747')
        console.log(res.data.token)

    })
});
