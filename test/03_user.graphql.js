const client = require('./_graphql_client')
const config = require('./_config')
const assert = require('assert')

describe('graphql user', () => {
  it('updateUserInfo', async () => {
    const query = `mutation{
      updateUserInfo(qq: "12345678", idCard: "______", bankCard:  "______", inviterCode:${config.userInfo.code}){
        _id
        username
        mobileNumber
        qq
        idCard
        bankCard
        status
        createdAt
        updatedAt
        billid
        bill{
          _id,
          total
          remained
          freeze
          withdraw
          createdAt
          updatedAt
        }
      }
    }`

    const res = await client(query, {})
    assert('12345678' === res.updateUserInfo.qq)
  });

  it('updateUserStatus', async () => {
    const query = `mutation{
      updateUserStatus(_id: "${config.userInfo._id}", status: OK){
        _id
        username
        mobileNumber
        qq
        idCard
        bankCard
        status
        createdAt
        updatedAt
      }
    }`
    // console.log(query)

    const res = await client(query, {})
    assert('OK' === res.updateUserStatus.status)
  });
})