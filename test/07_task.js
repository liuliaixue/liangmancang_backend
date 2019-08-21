const client = require('./_graphql_client')


const config = require('./_config')
const assert = require('assert')

describe('graphql task', () => {
  it('createTask', async () => {
    const query = `mutation {
      createTask(
        orderNumber: "______"
        goodsName: "______"
        goodsLink: "______"
        goodsImage: "______"
        goodsPrice: 12
        goodsTotal: 2
        goodsPriceShowed: 2
        goodsSpecification: "______"
        isFreeShipping: true
        howToFindGoods: "______"
        startTime: 0
        endTime: 1
        total: 1
        commission: 12
        platformServiceFee: 1
        platformCommission: 1
        extraCommission: 1
        extraImages: ["______"]
        remark: "______"
        storeid: "______"
      ) {
        _id
        parent
        orderNumber
        goodsName
        goodsLink
        goodsImage
        goodsPrice
        goodsTotal
        goodsPriceShowed
        goodsSpecification
        isFreeShipping
        howToFindGoods
        startTime
        endTime
        total
        commission
        platformServiceFee
        platformCommission
        extraCommission
        extraImages
        remark
        status
        storeid
        userid
        workerid
        createdAt
        updatedAt
      }
    }
    `

    const res = await client(query, {})
    assert(res.createTask.status === "DEFAULT")
  });

  it("updateTaskStatus: assigned", async () => {

  })

  it("updateTaskStatus: finished", async () => {

  })
  it("updateTaskStatus: appeal", async () => {

  })
  it("updateTaskStatus: abort")

  it("undoTask")

})
