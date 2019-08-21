const client = require('./_graphql_client')
const config = require('./_config')
const assert = require('assert')


describe('graphql store', () => {

  it("bindStore", async () => {
    const storeName = `alan store ${Date.now()}`
    const query = `mutation {
      bindStore(
        name: "${storeName}"
        website: "https://website"
        wangwang: "98992"
        storeScreenShotImage: "https://image"
        address: "shanghai chongyang road"
        contactPhone: "9090"
        type:"tmall"
      ) {
        _id
        name
        userid
        type
        website
        wangwang
        storeScreenShotImage
        address
        contactPhone
        status
        createdAt
        updatedAt
      }
    }`
    console.log(query)

    const res = await client(query, {})
    assert(storeName === res.bindStore.name)
    config.store = res.bindStore
  });

  it("updateStoreInfo", async () => {
    const newWebsite = `https://website/${Date.now()}`
    const query = `mutation {
      updateStoreInfo(
        _id: "${config.store._id}"
        website: "${newWebsite}"
        wangwang: "98992"
        storeScreenShotImage: "https://image"
        address: "shanghai chongyang road"
        contactPhone: "9090"
      ) {
        _id
        name
        userid
        type
        website
        wangwang
        storeScreenShotImage
        address
        contactPhone
        status
        createdAt
        updatedAt
      }
    }`
    console.log(query)

    const res = await client(query, {})
    assert(newWebsite === res.updateStoreInfo.website)


  })

  it("updateStoreStatus", async () => {
    const query = `mutation {
      updateStoreStatus(
        _id: "${config.store._id}"
        status:BAD
      ) {
        _id
        name
        userid
        type
        website
        wangwang
        storeScreenShotImage
        address
        contactPhone
        status
        createdAt
        updatedAt
      }
    }`
    console.log(query)

    const res = await client(query, {})
    assert("BAD" === res.updateStoreStatus.status)

  })
})