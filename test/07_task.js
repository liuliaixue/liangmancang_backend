const client = require('./_graphql_client')


const config = require('./_config')
const assert = require('assert')

describe('graphql task', () => {
  it('newTask', async () => {
    const query = `mutation {
      newTask(
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
    assert(res.newTask.status === "DEFAULT")

    config.task = res.newTask
  });

  it("updateTaskStatus: assigned", async () => {
    const query = `mutation {
      updateTaskStatus(_id: "${config.task._id}", status: ASSIGNED) {
        _id
        parent
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
    assert(res.updateTaskStatus.status === "ASSIGNED")
    assert(res.updateTaskStatus.workerid === config.userInfo._id)

  })

  it("updateTaskStatus: finished", async () => {
    const query = `mutation {
      updateTaskStatus(_id: "${config.task._id}", status: FINISHED) {
        _id
        parent
        status
        storeid
        userid
        workerid
        createdAt
        updatedAt
      }
    }`
    const res = await client(query, {})
    assert(res.updateTaskStatus.status === "FINISHED")
    //todo check bill

  })
  it("updateTaskStatus: appeal", async () => {
    const query = `mutation {
      updateTaskStatus(_id: "${config.task._id}", status: APPEAL) {
        _id
        parent
        status
        storeid
        userid
        workerid
        createdAt
        updatedAt
      }
    }`
    const res = await client(query, {})
    assert(res.updateTaskStatus.status === "APPEAL")

  })
  it("updateTaskStatus: abort", async () => {
    const query = `mutation {
      updateTaskStatus(_id: "${config.task._id}", status: APPEAL) {
        _id
        parent
        status
        storeid
        userid
        workerid
        createdAt
        updatedAt
      }
    }`
    const res = await client(query, {})
    assert(res.updateTaskStatus.status === "APPEAL")
    // todo check bill
  })


  it("taskList", async () => {
    const query = `mutation {
        taskList(skip: 0, limit: 10, status: DEFAULT) {
          list {
            _id
          }
          total
        }
      }`


    const res = await client(query, {})
    assert(res.taskList.total >= 0)

  })

})
