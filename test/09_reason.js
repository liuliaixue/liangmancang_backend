const client = require('./_graphql_client')


const config = require('./_config')
const assert = require('assert')

describe('graphql check in', () => {

  it("admin:reasonList", async () => {
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
    assert(res.reasonList.total >= 0)

  })

})
