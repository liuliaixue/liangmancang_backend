const { client, adminClient } = require('./_graphql_client');

const config = require('./_config');
const assert = require('assert');

describe('graphql check in', () => {
  it('newCheckIn', async () => {
    const query = `mutation {
      newCheckIn(time: 1) {
        _id
        userid
        createdAt
        updatedAt
      }
    }
`;

    const res = await client(query, {});
    assert(res.newCheckIn.createdAt > 0);
  });

  it('checkInList', async () => {
    const query = `mutation {
      checkInList(skip: 0, limit: 22, userid: "${config.user._id}") {
        list {
          _id
        }
        total
      }
    }
`;

    const res = await client(query, {});
    assert(res.checkInList.total >= 0);
  });
  // it('admin_checkInList', async () => {
  //   const query = `mutation {
  //     admin_checkInList(skip: 0, limit: 10) {
  //       list {
  //         _id
  //       }
  //       total
  //     }
  //   }`;

  //   const res = await client(query, {});
  //   assert(res.checkInList.total >= 0);
  // });
});
