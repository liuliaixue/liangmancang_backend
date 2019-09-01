const { client, adminClient } = require('./_graphql_client');
const config = require('./_config');
const assert = require('assert');

describe('graphql user', () => {
  it('updateUserInfo', async () => {
    const query = `mutation{
      updateUserInfo(qq: "12345678", idCard: "______", bankCard:  "______", inviterCode:"${config.userInfo.code}"){
        _id
        username
        mobilePhone
        qq
        idCard
        bankCard
        status
        createdAt
        updatedAt
        billid
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
    const query = `mutation {
      updateUserPassword(password: "${
        config.user.password
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
        billid
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
