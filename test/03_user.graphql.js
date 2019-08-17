const client = require('./_graphql_client')


const config = require('./_config')
const assert = require('assert')

describe('graphql user', () => {
    it('updateUserInfo', async () => {
        const query = `mutation{
            updateUserInfo(qq: "1234567", idCard: "______", bankCard: "______"){
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

        const res = await client(query, {})
        assert('1234567' === res.updateUserInfo.qq)
    });
})