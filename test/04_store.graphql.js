const { client, adminClient } = require('./_graphql_client');
const config = require('./_config');
const assert = require('assert');

describe('graphql store', () => {
  it('bindStore', async () => {
    const storeName = `alan store ${Date.now()}`;
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
    }`;
    const res = await client(query, {});
    assert(storeName === res.bindStore.name);
    config.store = res.bindStore;
  });

  it('updateStoreInfo', async () => {
    const newWebsite = `https://website/${Date.now()}`;
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
    }`;
    // console.log(query)

    const res = await client(query, {});
    assert(newWebsite === res.updateStoreInfo.website);
  });

  it('myStores, storeList', async () => {
    const query = `query {
      storeList(_id: "") {
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
    }
`;
    const res = await client(query, {});
    assert(res.storeList.length > 0);
  });

  it('admin_updateStoreStatus', async () => {
    const query = `mutation {
      admin_updateStoreStatus(
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
    }`;
    // console.log(query)

    const res = await adminClient(query, {});
    assert('BAD' === res.admin_updateStoreStatus.status);
  });

  it('admin_storeList', async () => {
    const query = `mutation {
      admin_storeList(
        skip:0
        limit:10
      ) {
        list{_id
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
        updatedAt}
        total
      }
    }`;
    // console.log(query)

    const res = await adminClient(query, {});
    assert(res.admin_storeList.total > 0);
  });
});
