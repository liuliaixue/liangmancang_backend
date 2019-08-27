const client = require('./_graphql_client')


const config = require('./_config')
const assert = require('assert')

describe('graphql message', () => {

  it("newMessage", async () => {


  })
  it("updateMessage", async () => {


  })
  it("messageList", async () => {
    const query = `mutation {
      reasonList(skip: 0, limit: 22) {
        list {
          _id
        }
        total
      }
    }
    `

    const res = await client(query, {})
    assert(res.checkInList.total >= 0)
  })

})
