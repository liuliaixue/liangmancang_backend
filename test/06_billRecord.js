const client = require('./_graphql_client')


const config = require('./_config')
const assert = require('assert')

describe('graphql billRecord', () => {
    it('billRecord', async () => {
        const query = `mutation{
          billRecord(toUserid: "5d57e0d39b501a3a75a17a39", amount: 2000, type: 0){
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
        assert(2000 === res.billRecord.amount)
        console.log(res.billRecord)
        config.billRecord = res.billRecord
    });

    // it('billRecord', async () => {
    //     const query = `mutation{
    //         mutation{
    //             billRecordCheck(_id: ${config.billRecord._id}, status: 1){
    //               userid
    //               toUserid
    //               amount
    //               type
    //               status
    //               createdAt
    //               updatedAt
    //             }
    //           }`

    //     const res = await client(query, {})
    //     assert(2000 === res.billRecord.amount)
    // });
})