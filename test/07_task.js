const client = require('./_graphql_client')


const config = require('./_config')
const assert = require('assert')

describe('graphql task', () => {
    it('createTask', async () => {
        const query = `
        mutation{
          createTask( goodsName: "______", 
                    goodsLink: "______", 
                    goodsImage: "______", 
                    goodsPrice: 1, 
                    amount: 1, 
                    goodsPriceShowed: 2, 
                    specification: "______", 
                    isFreeShipping: true, 
                    howToFindTask: "______", 
                    startTime: 12,
                    endTime: 12, 
                    amout: 12, 
                    commission: 2, 
                    platformServiceFee: 2,
                    platformCommission: 2, 
                    extraCommission: 2,
                    extraImages: ["______"], 
                    remark: "______", 
                    storeid: "______"){
            _id
            parent
            orderNumber
            goodsName
            goodsLink
            goodsImage
            goodsPrice
            amount
            goodsPriceShowed
            specification
            isFreeShipping
            howToFindTask
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
        }`

        const res = await client(query, {})
        assert(res.createTask.createdAt > 0)
    });

})
