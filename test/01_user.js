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
  it('reigster with inviterCode', async () => {
    const user = config.user;
    const res = await client.post('/api/auth/register', {
      username: user.username + 'inviter',
      password: '123456',
      mobilePhone: config.ramdomMobilePhone(),
      inviterCode: config.userInfo.code
    });
    // 这个新用户的邀请人　是　上一个用户
    assert(res.data.user.inviter === config.userInfo._id);
  });
  it('register fail with too short username', async () => {
    const user2 = config.user2;
    const res = await client.post('/api/auth/register', user2);
    assert(res.status === 400);
    assert(
      res.data.message ===
        `"username" length must be at least 3 characters long`
    );
  });
  it('register fail with too long username', async () => {
    const user3 = config.user3;
    const res = await client.post('/api/auth/register', user3);
    assert(res.status === 400);

    assert(
      res.data.message ===
        `"username" length must be less than or equal to 50 characters long`
    );
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
    // console.log(res.data.message);
  });

  it('resetPassword', async () => {
    // get code
    const resetCode = await client.post('/api/user/verificationCode', {
      mobilePhone: config.user.mobilePhone
    });
    // console.log(resetCode.data);
    // reset password
    const resetPassword = await client.post('/api/user/resetPassword', {
      username: config.user.username,
      verificationCode: resetCode.data.code,
      newPassword: 'p123456'
    });
    // console.log(resetPassword.data);
    // redo login
    const res = await client.post('/api/auth/login', {
      username: config.user.username,
      password: 'p123456'
    });
    assert(res.data.user.username === config.user.username);
  });
});
