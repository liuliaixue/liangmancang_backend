const client = require('./_graphql_client')


const config = require('./_config')
const assert = require('assert')

// const toUserId = config.userInfo._id

describe('graphql billRecord', () => {
  it('billRecord charege', async () => {
    const amount = 12000
    const query = `mutation{
          newBillRecord(toUserid: "${config.userInfo._id}", amount: ${amount}, type: DEFAULT){
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
    assert(amount === res.newBillRecord.amount)

    config.charge = res.newBillRecord
  });

  it('billRecord check', async () => {
    const query = `mutation{
      checkBillRecord(_id: "${config.charge._id}"){
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
    assert(12000 === res.checkBillRecord.amount)

  });

  it('withdraw', async () => {
    const amount = 2000
    const query = `mutation{
      newBillRecord(toUserid: "${config.userInfo._id}", amount: ${amount}, type: WITHDRAW){
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
    assert(amount === res.newBillRecord.amount)

    config.withdraw = res.newBillRecord

  })
  it('withdraw check', async () => {
    const query = `mutation{
      checkBillRecord(_id: "${config.withdraw._id}"){
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

  })
})