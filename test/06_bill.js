const { client, adminClient } = require('./_graphql_client');

const config = require('./_config');
const assert = require('assert');

describe('graphql bill', () => {
  it('admin charge', async () => {
    const amount = 50000 * 100;
    const query = `mutation{
          admin_newBill(toUserid: "${config.userInfo._id}", amount: ${amount}, type: DEFAULT){
            _id
            total
            remained
            freeze
            withdraw
            type
            amount
            fromBank
            fromCard
            fromUser

            status
            userid
            updatedBy
            createdAt
            updatedAt
          }
        }`;

    const res = await adminClient(query, {});

    //# amount check
    assert(amount === res.admin_newBill.amount);

    config.charge = res.admin_newBill;
  });
  it('admin charge check', async () => {
    const query = `mutation{
      admin_checkBill(_id: "${config.charge._id}"){
                  _id
            total
            remained
            freeze
            withdraw
            type
            amount
            fromBank
            fromCard
            fromUser

            status
            userid
            updatedBy
            createdAt
            updatedAt
      }
    }`;
    const res = await adminClient(query, {});
    assert(50000 * 100 === res.admin_checkBill.amount);
  });
  it('admin: withdraw', async () => {
    const amount = 2000;
    const query = `mutation{
      admin_newBill(toUserid: "${config.userInfo._id}", amount: ${amount}, type: WITHDRAW){
            _id
            total
            remained
            freeze
            withdraw
            type
            amount
            fromBank
            fromCard
            fromUser

            status
            userid
            updatedBy
            createdAt
            updatedAt
      }
    }`;

    const res = await adminClient(query, {});

    assert(amount === res.admin_newBill.amount);

    config.withdraw = res.admin_newBill;
  });
  it('admin: withdraw check', async () => {
    const query = `mutation{
      admin_checkBill(_id: "${config.withdraw._id}"){
            _id
            total
            remained
            freeze
            withdraw
            type
            amount
            fromBank
            fromCard
            fromUser

            status
            userid
            updatedBy
            createdAt
            updatedAt
      }
    }`;
    const res = await adminClient(query, {});
    assert(2000 === res.admin_checkBill.amount);
  });
  it('admin: billList', async () => {
    const query = `query{
      admin_billList(skip:0,limit:10){
        list{
           _id
            total
            remained
            freeze
            withdraw
            type
            amount
            fromBank
            fromCard
            fromUser

            status
            userid
            updatedBy
            createdAt
            updatedAt
          }
        total
      }
    }`;
    const res = await adminClient(query, {});
    assert(res.admin_billList.total > 0);
  });
  it('billList', async () => {
    const query = `query{
      billList(skip:0,limit:10){
        list{
        _id
            total
            remained
            freeze
            withdraw
            type
            amount
            fromBank
            fromCard
            fromUser

            status
            userid
            updatedBy
            createdAt
            updatedAt}
        total
      }
    }`;
    const res = await client(query, {});
    assert(res.billList.total > 0);
  });

  it('newBill', async () => {
    const amount = 22000;
    const query = `mutation{
          newBill(amount: ${amount}, type: DEFAULT, fromBank:"农业银行",fromCard:"1231231231231239999", fromUser: "钱三"){
            _id
            total
            remained
            freeze
            withdraw
            type
            amount
            fromBank
            fromCard
            fromUser

            status
            userid
            updatedBy
            createdAt
            updatedAt
          }
        }`;

    const res = await client(query, {});

    //# amount check
    assert(amount === res.newBill.amount);
  });
});
