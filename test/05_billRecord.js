const { client, adminClient } = require('./_graphql_client');

const config = require('./_config');
const assert = require('assert');

// const toUserId = config.userInfo._id

describe('graphql billRecord', () => {
  it('admin_newBillRecord', async () => {
    const amount = 12000;
    const query = `mutation{
          admin_newBillRecord(toUserid: "${config.userInfo._id}", amount: ${amount}, type: DEFAULT){
            _id
            userid
            toUserid
            amount
            type
            status
            createdAt
            updatedAt
          }
        }`;

    const res = await adminClient(query, {});

    //# amount check
    assert(amount === res.admin_newBillRecord.amount);

    config.charge = res.admin_newBillRecord;
  });

  it('admin_checkBillRecord', async () => {
    const query = `mutation{
      admin_checkBillRecord(_id: "${config.charge._id}"){
        _id
        userid
        toUserid
        amount
        type
        status
        createdAt
        updatedAt
      }
    }`;
    const res = await adminClient(query, {});
    assert(12000 === res.admin_checkBillRecord.amount);
  });

  it('admin: withdraw', async () => {
    const amount = 2000;
    const query = `mutation{
      admin_newBillRecord(toUserid: "${config.userInfo._id}", amount: ${amount}, type: WITHDRAW){
        _id
        userid
        toUserid
        amount
        type
        status
        createdAt
        updatedAt
      }
    }`;

    const res = await adminClient(query, {});

    //# amount check
    assert(amount === res.admin_newBillRecord.amount);

    config.withdraw = res.admin_newBillRecord;
  });
  it('admin: withdraw check', async () => {
    const query = `mutation{
      admin_checkBillRecord(_id: "${config.withdraw._id}"){
        _id
        userid
        toUserid
        amount
        type
        status
        createdAt
        updatedAt
      }
    }`;
    const res = await adminClient(query, {});
    assert(2000 === res.admin_checkBillRecord.amount);
  });
  it('admin: billRecordList', async () => {
    const query = `mutation{
      admin_billRecordList(skip:0,limit:10){
        list{
        _id
        userid
        toUserid
        amount
        type
        status
        createdAt
        updatedAt}
        total
      }
    }`;
    const res = await adminClient(query, {});
    assert(res.admin_billRecordList.total > 0);
  });
  it('billRecordList', async () => {
    const query = `mutation{
      billRecordList(skip:0,limit:10){
        list{
        _id
        userid
        toUserid
        amount
        type
        status
        createdAt
        updatedAt}
        total
      }
    }`;
    const res = await client(query, {});
    assert(res.billRecordList.total > 0);
  });
});
