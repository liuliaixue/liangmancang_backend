// mocha test/00_admin.js test/01_user.js test/03_user.graphql.js test/04_store.graphql.js test/05_billRecord.js test/07_task.js

const { client, adminClient } = require('./_graphql_client');

const config = require('./_config');
const assert = require('assert');

describe('graphql task', () => {
  it('newTask', async () => {
    const query = `mutation {
      newTask(
        goodsName: "木林森皮鞋男冬季加绒韩版商务休闲黑色真皮英伦正装内增高男鞋子"
        goodsLink: "https://detail.tmall.com/item.htm?id=595735103244&spm=a21bz.7725275.1998564545.1.2e245fc2SVQnDL&umpChannel=qianggou&u_channel=qianggou"
        goodsImage: "https://img.alicdn.com/imgextra/i1/3372687502/O1CN013D7wEd25Hxol9V6qT_!!3372687502.jpg_430x430q90.jpg"
        goodsPrice: 39900
        goodsTotal: 1
        goodsPriceShowed: 39900
        goodsSpecification: "尺码:37,颜色:红色"
        isFreeShipping: false
    
        howToFindGoods: "keyword=增高男鞋子&price=1-1000"
    
        orders: [
          {
            type: DEFAULT
            buyTimes: 1
            browseTimes: 2
            collectTimes: 1
            collect: "收藏商品"
            searchKeyword: "鞋子"
          }
          {
            type: DEFAULT
            buyTimes: 0
            browseTimes: 2
            collectTimes: 1
            collect: "收藏店铺"
            searchKeyword: "内增高男鞋"
          }
          {
            type: WORD_COMMENT
            buyTimes: 1
            browseTimes: 8
            collectTimes: 1
            collect: "收藏商品"
            searchKeyword: "鞋子"
            comment: "鞋子很不错,很适合我儿子"
          }
          {
            type: PICTURE_COMMENT
            buyTimes: 1
            browseTimes: 2
            collectTimes: 1
            collect: "收藏商品"
            searchKeyword: "鞋子"
            goodsSpecification: "尺码:38,颜色:红色"
            comment: "鞋子很不错,很适合我儿子"
            pictures: ["", ""]
            remark: "给出舒服,尺码准确,合脚,老公喜欢等评论,要有评论30字以上"
          }
        ]
    
        startTime: 1572566400000 #new Date("2019-11-01").getTime(),
        endTime: 1572652800000 #new Date("2019-11-02").getTime(),
        extraCommission: 100
        extraImages: [""]
        remark: "111"
        storeid: "${config.store._id}"
      ) {
        _id
        goodsName
        goodsLink
        goodsImage
        goodsPrice
        goodsTotal
        goodsPriceShowed
        goodsSpecification
        isFreeShipping
        howToFindGoods
        orders {
          type
        }
        startTime
        endTime
        commission
        platformServiceFee
        platformCommission
        extraCommission
        extraImages
        status
        storeid
        userid
        createdAt
        updatedAt
      }
    }    
    `;
    // console.log(query);
    const res = await client(query, {});
    assert(res.newTask.status === 'DEFAULT');

    config.task = res.newTask;
  });

  it('taskList', async () => {
    const query = `mutation {
        taskList(skip: 0, limit: 10, status: DEFAULT) {
          list {
            _id
          }
          total
        }
      }`;

    const res = await client(query, {});
    assert(res.taskList.total >= 0);
  });

  it('admin_taskList', async () => {
    const query = `mutation {
        admin_taskList(skip: 0, limit: 10, status: DEFAULT) {
          list {
            _id
          }
          total
        }
      }`;

    const res = await adminClient(query, {});

    assert(res.admin_taskList.total >= 0);
  });
  it('updateTaskInfo', async () => {
    const query = `mutation {
      updateTaskInfo(
        _id:"${config.task._id}"
        goodsName: "木林森皮鞋男冬季加绒韩版商务休闲黑色真皮英伦正装内增高男鞋子"
        goodsLink: "https://detail.tmall.com/item.htm?id=595735103244&spm=a21bz.7725275.1998564545.1.2e245fc2SVQnDL&umpChannel=qianggou&u_channel=qianggou"
        goodsImage: "https://img.alicdn.com/imgextra/i1/3372687502/O1CN013D7wEd25Hxol9V6qT_!!3372687502.jpg_430x430q90.jpg"
        goodsPrice: 39900
        goodsTotal: 1
        goodsPriceShowed: 39900
        goodsSpecification: "尺码:37,颜色:红色"
        isFreeShipping: false
    
        howToFindGoods: "keyword=增高男鞋子&price=1-1000&sort=1"
    
        orders: [
          {
            type: DEFAULT
            buyTimes: 1
            browseTimes: 2
            collectTimes: 1
            collect: "收藏商品"
            searchKeyword: "鞋子"
          }
          {
            type: DEFAULT
            buyTimes: 3
            browseTimes: 2
            collectTimes: 1
            collect: "收藏商品"
            searchKeyword: "鞋子"
          }
          {
            type: DEFAULT
            buyTimes: 0
            browseTimes: 2
            collectTimes: 1
            collect: "收藏店铺"
            searchKeyword: "内增高男鞋"
          }
          {
            type: WORD_COMMENT
            buyTimes: 1
            browseTimes: 8
            collectTimes: 1
            collect: "收藏商品"
            searchKeyword: "鞋子"
            comment: "鞋子很不错,很适合我儿子"
          }
          {
            type: PICTURE_COMMENT
            buyTimes: 1
            browseTimes: 2
            collectTimes: 1
            collect: "收藏商品"
            searchKeyword: "鞋子"
            goodsSpecification: "尺码:38,颜色:红色"
            comment: "鞋子很不错,很适合我儿子"
            pictures: ["", ""]
            remark: "给出舒服,尺码准确,合脚,老公喜欢等评论,要有评论30字以上"
          }
        ]
    
        startTime: 1572566400000 #new Date("2019-11-01").getTime(),
        endTime: 1572652800000 #new Date("2019-11-02").getTime(),
        extraCommission: 100
        extraImages: [""]
        remark: "111"
        storeid: "${config.store._id}"
      ) {
        _id
        goodsName
        goodsLink
        goodsImage
        goodsPrice
        goodsTotal
        goodsPriceShowed
        goodsSpecification
        isFreeShipping
        howToFindGoods
        orders {
          type
        }
        startTime
        endTime
        commission
        platformServiceFee
        platformCommission
        extraCommission
        extraImages
        status
        storeid
        userid
        createdAt
        updatedAt
      }
    }    
    `;

    const res = await client(query, {});
    assert(res.updateTaskInfo.status === 'DEFAULT');
  });

  it('admin_updateTaskStatus: check', async () => {
    // console.log(config);
    const query = `
      mutation {
        admin_updateTaskStatus(_id: "${config.task._id}", status: CHECKED) {
          _id
          goodsName
          goodsLink
          goodsImage
          goodsPrice
          goodsTotal
          goodsPriceShowed
          goodsSpecification
          isFreeShipping
          howToFindGoods
          orders {
            type
          }
          startTime
          endTime
          commission
          platformServiceFee
          platformCommission
          extraCommission
          extraImages
          status
          storeid
          userid
          createdAt
          updatedAt
        }
      }`;
    const res = await adminClient(query, {});
    assert(res.admin_updateTaskStatus.status === 'CHECKED');
  });

  it('order list', async () => {
    const query = `mutation {
      orderList(skip: 0, limit: 10, status: DEFAULT) {
        list {
          _id
        }
        total
      }
    }`;
    const res = await client(query, {});

    assert(res.orderList.total > 0);
    assert(res.orderList.list.length > 0);
    // two children tasks
    config.order = res.orderList.list[0];
    config.order2 = res.orderList.list[1];
  });
  it('admin_orderList', async () => {
    const query = `mutation {
      admin_orderList(skip: 0, limit: 10, status: DEFAULT) {
        list {
          _id
        }
        total
      }
    }`;
    const res = await adminClient(query, {});
    assert(res.admin_orderList.total > 0);
  });

  it('updateOrderStatus: assigned', async () => {
    const query = `mutation {
      updateOrderStatus(_id: "${config.order._id}", status: ASSIGNED) {
       _id
      taskid
      type
      buyTimes
      browseTimes
      collectTimes
      collect
      searchKeyword
      goodsSpecification
      comment
      pictures
      remark
      status
      userid
      workerid
      startAt
      createdAt
      updatedAt
      }
    }
`;
    const res = await adminClient(query, {});
    assert(res.updateOrderStatus.status === 'ASSIGNED');
    assert(res.updateOrderStatus.workerid === config.adminInfo._id);
  });
  it('updateOrderStatus: finished', async () => {
    const query = `mutation {
      updateOrderStatus(_id: "${config.order._id}", status: FINISHED) {
        _id
        taskid
        type
        buyTimes
        browseTimes
        collectTimes
        collect
        searchKeyword
        goodsSpecification
        comment
        pictures
        remark
        status
        userid
        workerid
        startAt
        createdAt
        updatedAt
      }
    }`;
    // console.log(config);
    // return;
    const res = await client(query, {});
    assert(res.updateOrderStatus.status === 'FINISHED');
    //todo check bill
  });
  // it('updateTaskStatus: appeal', async () => {
  //   const query = `mutation {
  //     updateTaskStatus(_id: "${config.childTask._id}", status: APPEAL) {
  //       _id
  //       parent
  //       status
  //       storeid
  //       userid
  //       workerid
  //       createdAt
  //       updatedAt
  //     }
  //   }`;
  //   const res = await client(query, {});

  //   assert(res.updateTaskStatus.status === 'APPEAL');
  // });
  // it('updateTaskStatus: abort', async () => {
  //   const query = `mutation {
  //     updateTaskStatus(_id: "${config.childTask._id}", status: ABORT) {
  //       _id
  //       parent
  //       status
  //       storeid
  //       userid
  //       workerid
  //       createdAt
  //       updatedAt
  //     }
  //   }`;
  //   const res = await client(query, {});
  //   assert(res.updateTaskStatus.status === 'ABORT');
  //   // todo check bill
  // });
});
