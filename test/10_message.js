const { client, adminClient } = require('./_graphql_client');
const config = require('./_config');
const assert = require('assert');

describe('graphql message', () => {
  it('newMessage default', async () => {
    const query = `mutation {
      newMessage(content: "native", type: DEFAULT, toUserid:"${config.admin._id}",image:"http://testimage", phone:"88888888") {
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
  it('newMessage less arguments', async () => {
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
      messageList(skip: 0, limit: 10, type: DEFAULT) {
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
  it('removeMessage', async () => {
    const newMessageQuery = `mutation {
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
    const res = await client(newMessageQuery, {});
    assert(res.newMessage._id.length >= 0);

    const getMessageQuery = `query {
      message(_id:"${res.newMessage._id}") {
        _id
        content
        taskid
        userid
        createdAt
        updatedAt
      }
    }
    `;
    const getRes = await client(getMessageQuery, {});
    assert(getRes.message._id.length >= 0);

    const removeMessageQuery = `mutation {
      removeMessage(_id:"${res.newMessage._id}") {
        _id
        content
        taskid
        userid
        createdAt
        updatedAt
      }
    }
    `;
    const resRemove = await client(removeMessageQuery, {});

    const getRes2 = await client(getMessageQuery, {});
    assert(getRes2.errors !== null);
  });

  it('admin new message');
  it('admin update message');
  it('admin message list');
});
