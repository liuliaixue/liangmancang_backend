/**
mocha test
 */

const { client, adminClient } = require('./_graphql_client');
const config = require('./_config');
const assert = require('assert');

describe('graphql user', () => {
  it('user', async () => {
    const query = `query {
      user(_id: "") {
        _id
        username
        mobilePhone
        code
        inviter
        qq
        idCard
        bankCard
        status
        createdAt
        updatedAt
      }
    }`;
    const res = await client(query, {});
    assert(config.user.username === res.user.username);
  });
  it('updateUserInfo', async () => {
    const query = `mutation{
      updateUserInfo(qq: "12345678", idCard: "______", bankCard:  "______", inviterCode:"${config.adminInfo.code}"){
        _id
        username
        mobilePhone
        qq
        idCard
        bankCard
        status
        createdAt
        updatedAt
        bill{
          _id
          total
          remained
          freeze
          withdraw
          createdAt
          updatedAt
        }
      }
    }`;

    const res = await client(query, {});
    assert('12345678' === res.updateUserInfo.qq);
  });

  it('updatePassword', async () => {
    //password was set as 'p123456' in 01_user.js
    const query = `mutation {
      updateUserPassword(password: "${
        'p123456' //config.user.password
      }", newPassword: "${config.user.password + 'a'}") {
        _id
        username
        mobilePhone
        code
        inviter
        qq
        idCard
        bankCard
        status
        createdAt
        updatedAt
        bill {
          _id
          total
          remained
          freeze
          withdraw
          createdAt
          updatedAt
        }
      }
    }`;
    const res = await client(query, {});
    assert(config.userInfo.updatedAt < res.updateUserPassword.updatedAt);
  });
  it('login with new password', async () => {
    const restfulClient = require('./_client')();
    const res = await restfulClient.post('/api/auth/login', {
      ...config.user,
      password: `${config.user.password + 'a'}`
    });
    assert(res.data.user.username === config.user.username);
    // var fs = require('fs');
    // const path = require('path');
    // fs.writeFileSync(path.join(__dirname, '_token'), res.data.token);
    // config.token = res.data.token;
  });

  it('admin_updateUserStatus', async () => {
    const query = `mutation{
      admin_updateUserStatus(_id: "${config.userInfo._id}", status: OK){
        _id
        username
        mobilePhone
        qq
        idCard
        bankCard
        status
        createdAt
        updatedAt
      }
    }`;
    // console.log(query)

    const res = await adminClient(query, {});
    assert('OK' === res.admin_updateUserStatus.status);
  });

  it('admin_userList', async () => {
    const query = `mutation {
      admin_userList(skip: 0, limit: 10) {
        list {
          _id
        }
        total
      }
    }`;
    const res = await adminClient(query, {});
    assert(res.admin_userList.total > 0);
  });
});
