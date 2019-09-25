const config = require('./_config');
const assert = require('assert');
const client = require('./_client')();

describe('User', function() {
  it('register', async () => {
    const user = config.user;
    const res = await client.post('/api/auth/register', user);
    assert(res.data.user.username === user.username);
    config.userInfo = res.data.user;
  });

  it('register fail with same username ', async () => {
    let res = await client.post('/api/auth/register', {
      username: config.user.username,
      password: '123456',

      mobilePhone: '18817570743'
    });
    assert(res.status === 500);
  });
  it('register fail with same phoneNumber', async () => {
    let res = await client.post('/api/auth/register', {
      username: config.user.username + 'user2',
      password: '123456',

      mobilePhone: config.user.mobilePhone
    });
    assert(res.status === 500);
  });

  it('login', async () => {
    const res = await client.post('/api/auth/login', config.user);
    assert(res.data.user.username === config.user.username);
    var fs = require('fs');
    const path = require('path');
    fs.writeFileSync(path.join(__dirname, '_token'), res.data.token);
    config.token = res.data.token;
  });

  it('login fail with wrong password', async () => {
    const res = await client.post('/api/auth/login', {
      username: config.user.username,
      password: config.user.password + '1',

      mobilePhone: '18817570743'
    });
    assert(res.status === 500);
    console.log(res.data.message);
  });
});
