const client = require('./_graphql_client')


const config = require('./_config')
const assert = require('assert')

const toUserId = config.user._id

describe('graphql billRecord', () => {
  it('billRecord charege', async () => {
    const query = `mutation{
          createBillRecord(toUserid: "${toUserId}", amount: 2000, type: DEFAULT){
            _id
            userid
            toUserid
            amount
            type
            status
            createdAt
            updatedAt
          }
        }`

    const res = await client(query, {})

    //# amount check
    assert(2000 === res.createBillRecord.amount)

    config.createBillRecord = res.createBillRecord
    return true
  });

  it('billRecord check', async () => {
    const query = `mutation{
      checkBillRecord(_id: "${config.createBillRecord._id}"){
        _id
        userid
        toUserid
        amount
        type
        status
        createdAt
        updatedAt
      }
    }`
    const res = await client(query, {})
    assert(2000 === res.checkBillRecord.amount)

    return true
  });

  it('withdraw', async () => {
    const query = `mutation{
      createBillRecord(toUserid: "${toUserId}", amount: 2000, type: WITHDRAW){
        _id
        userid
        toUserid
        amount
        type
        status
        createdAt
        updatedAt
      }
    }`

    const res = await client(query, {})

    //# amount check
    assert(2000 === res.createBillRecord.amount)

    config.createBillRecord = res.createBillRecord
    return true
  })
  it('withdraw check', async () => {
    const query = `mutation{
      checkBillRecord(_id: "${config.createBillRecord._id}"){
        _id
        userid
        toUserid
        amount
        type
        status
        createdAt
        updatedAt
      }
    }`
    const res = await client(query, {})
    assert(2000 === res.checkBillRecord.amount)

    return true
  })
})