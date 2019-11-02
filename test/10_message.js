const { client, adminClient } = require('./_graphql_client');
const config = require('./_config');
const assert = require('assert');

describe('graphql message', () => {
  it('newMessage default', async () => {
    const query = `mutation {
      newMessage(content: "native", type: DEFAULT, toUserid:"${config.admin._id}") {
        _id
        content
        taskid
        userid
        createdAt
        updatedAt
      }
    }
    `;
    const res = await client(query, {});
    assert(res.newMessage.content === 'native');
    // console.log(res)
    config.message = res.newMessage;
  });
  // it('newMessage: feedback', async () => {
  //   const query = `mutation {
  //     newMessage(content: "native", taskid: "${config.task._id}", type: DEFAULT, toUserid:"${config.admin._id}") {
  //       _id
  //       content
  //       taskid
  //       userid
  //       createdAt
  //       updatedAt
  //     }
  //   }
  //   `;
  //   const res = await client(query, {});
  //   assert(res.newMessage.content === 'native');
  //   // console.log(res)
  //   config.message = res.newMessage;
  // });
  // it('newMessage: appeal');

  it('updateMessage', async () => {
    const query = `
      mutation{
        updateMessage(_id: "${config.message._id}", content: "not native"){
          _id
          content
          taskid
          userid
          createdAt
          updatedAt
        }
      }`;
    const res = await client(query, {});
    assert(res.updateMessage.content === 'not native');
    assert(res.updateMessage._id === config.message._id);
  });
  it('messageList', async () => {
    const query = `query {
      messageList(skip: 0, limit: 10) {
        list {
          _id
        }
        total
      }
    }
    `;
    const res = await client(query, {});
    assert(res.messageList.total >= 0);
  });

  it('admin new message');
  it('admin update message');
  it('admin message list');
});
