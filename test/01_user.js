
const config = require('./_config')
const assert = require('assert')
const client = require('./_client')()

describe('User', function () {
  it('register', async () => {
    const user = config.user
    const res = await client.post('/api/auth/register', user)
    console.log(res.data)
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
    const res = await client.post('/api/auth/login', config.user)
    assert(res.data.user.username === config.user.username)
    var fs = require('fs')
    const path = require('path')
    fs.writeFileSync(path.join(__dirname, '_token'), res.data.token)
    config.token = res.data.token

  })
});
