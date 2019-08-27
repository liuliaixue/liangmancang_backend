const client = require('./_graphql_client')


const config = require('./_config')
const assert = require('assert')

describe('graphql message', () => {

  it("newMessage", async () => {
    const query = `mutation {
      newMessage(content: "native", taskid: "${config.task._id}") {
        _id
        content
        taskid
        userid
        createdAt
        updatedAt
      }
    }
    `
    const res = await client(query, {})
    assert(res.newMessage.content === 'native')
    // console.log(res)
    config.message = res.newMessage

  })
  it("updateMessage", async () => {

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
      }`
    const res = await client(query, {})
    assert(res.updateMessage.content === 'not native')
    assert(res.updateMessage._id === config.message._id)

  })
  it("messageList", async () => {
    const query = `mutation {
      messageList(skip: 0, limit: 10) {
        list {
          _id
        }
        total
      }
    }
    `
    const res = await client(query, {})
    assert(res.messageList.total >= 0)
  })

})
