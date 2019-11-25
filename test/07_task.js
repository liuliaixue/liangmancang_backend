// mocha test/00_admin.js test/01_user.js test/03_user.graphql.js test/04_store.graphql.js test/07_task.js

const { client, adminClient } = require('./_graphql_client');

const config = require('./_config');
const assert = require('assert');

describe('graphql task', () => {
  it('newTask', async () => {
    const query = `mutation {
            newTask(
              platform: TAOBAO
              type: MOBILE_TAOBAO
             
              goodsName: "木林森皮鞋男冬季加绒韩版商务休闲黑色真皮英伦正装内增高男鞋子"
              goodsLink: "https://detail.tmall.com/item.htm?id=595735103244&spm=a21bz.7725275.1998564545.1.2e245fc2SVQnDL&umpChannel=qianggou&u_channel=qianggou"
              goodsImage: "https://img.alicdn.com/imgextra/i1/3372687502/O1CN013D7wEd25Hxol9V6qT_!!3372687502.jpg_430x430q90.jpg"
              goodsPrice: 39900
              goodsTotal: 1
              goodsPriceShowed: 39900
              goodsSpecification: "尺码:37,颜色:红色"
              isFreeShipping: false

              search_sort: "销量"
              search_ReceiverNum: 1200
              search_price_from: 15000
              search_price_to: 40000
              search_where: "上海 浦东"
              search_keyword:"增高男鞋"

              orders: [
                {
                  type: DEFAULT
                  buyTimes: 1
                  browseTimes: 2
                  collectTimes: 1
                  collectGoods: true
                  collectStore: true
                  addToCart: true
                  searchKeyword: "鞋子"
                }
                {
                  type: DEFAULT
                  buyTimes: 0
                  browseTimes: 2
                  collectTimes: 1
                  collectGoods: false
                  collectStore: false
                  addToCart: false
                  searchKeyword: "内增高男鞋"
                }
                {
                  type: WORD_COMMENT
                  buyTimes: 1
                  browseTimes: 8
                  collectTimes: 1
                  collectGoods: true
                  collectStore: true
                  addToCart: true
                  searchKeyword: "鞋子"
                  comment: "鞋子很不错,很适合我儿子"
                }
                {
                  type: PICTURE_COMMENT
                  buyTimes: 1
                  browseTimes: 2
                  collectTimes: 1
                  collectGoods: true
                  collectStore: true
                  addToCart: true
                  searchKeyword: "鞋子"
                  goodsSpecification: "尺码:38,颜色:红色"
                  comment: "鞋子很不错,很适合我儿子"
                  pictures: ["", ""]
                  remark: "给出舒服,尺码准确,合脚,老公喜欢等评论,要有评论30字以上"
                }
              ]

              startTime: 1572566400000 #new Date("2019-11-01").getTime(),
              endTime: 1572652800000 #new Date("2019-11-02").getTime(),
              orderQuantity: 2,
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

              orders {
                type
              }
              startTime
              endTime
              orderQuantity
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
    // console.log(query);
    const res = await client(query, {});
    assert(res.newTask.status === 'DEFAULT');

    config.task = res.newTask;
  });
  it('updateTaskInfo', async () => {
    const query = `mutation {
      updateTaskInfo(
        _id:"${config.task._id}"
        platform: TAOBAO
        type: MOBILE_TAOBAO
        goodsName: "木林森皮鞋男冬季加绒韩版商务休闲黑色真皮英伦正装内增高男鞋子"
        goodsLink: "https://detail.tmall.com/item.htm?id=595735103244&spm=a21bz.7725275.1998564545.1.2e245fc2SVQnDL&umpChannel=qianggou&u_channel=qianggou"
        goodsImage: "https://img.alicdn.com/imgextra/i1/3372687502/O1CN013D7wEd25Hxol9V6qT_!!3372687502.jpg_430x430q90.jpg"
        goodsPrice: 39900
        goodsTotal: 1
        goodsPriceShowed: 39900
        goodsSpecification: "尺码:37,颜色:红色"
        isFreeShipping: false
    
        search_sort: "销量"
        search_ReceiverNum: 1200
        search_price_from: 15000
        search_price_to: 40000
        search_where: "上海 浦东"
        search_keyword:"增高男鞋"
    
        orders: [
          {
            type: DEFAULT
            buyTimes: 1
            browseTimes: 2
            collectTimes: 1
            collectGoods: true
            collectStore: true
            addToCart: true
            searchKeyword: "鞋子"
          }
          {
            type: DEFAULT
            buyTimes: 3
            browseTimes: 2
            collectTimes: 1
            collectGoods: true
            collectStore: true
            addToCart: true
            searchKeyword: "鞋子"
          }
          {
            type: DEFAULT
            buyTimes: 0
            browseTimes: 2
            collectTimes: 1
            collectGoods: true
            collectStore: true
            addToCart: true
            searchKeyword: "内增高男鞋"
          }
          {
            type: WORD_COMMENT
            buyTimes: 1
            browseTimes: 8
            collectTimes: 1
            collectGoods: true
            collectStore: true
            addToCart: true
            searchKeyword: "鞋子"
            comment: "鞋子很不错,很适合我儿子"
          }
          {
            type: PICTURE_COMMENT
            buyTimes: 1
            browseTimes: 2
            collectTimes: 1
            collectGoods: true
            collectStore: true
            addToCart: true
            searchKeyword: "鞋子"
            goodsSpecification: "尺码:38,颜色:红色"
            comment: "鞋子很不错,很适合我儿子"
            pictures: ["", ""]
            remark: "给出舒服,尺码准确,合脚,老公喜欢等评论,要有评论30字以上"
          }
        ]
    
        startTime: 1572566400000 #new Date("2019-11-01").getTime(),
        endTime: 1572652800000 #new Date("2019-11-02").getTime(),
        orderQuantity: 2,
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

        orders {
          type,
        }
        startTime
        endTime
        orderQuantity
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
  it('confirm task', async () => {
    const query = `mutation {
            confirmTask(_id: "${config.task._id}") {
              _id
              goodsName
              goodsLink
              goodsImage
              goodsPrice
              goodsTotal
              goodsPriceShowed
              goodsSpecification
              isFreeShipping

              orders {
                type
              }
              startTime
              endTime
              orderQuantity
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

    const res = await client(query, {});
    assert(res.confirmTask.status === 'CONFIRMED');
  });
  it('taskList', async () => {
    const query = `query {
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
    const query = `query {
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

  it('admin_updateTaskStatus: check', async () => {
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
          orders {
            type
          }
          startTime
          endTime
          orderQuantity
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
    const query = `query {
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
    const query = `query {
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
      collectGoods
      collectStore
      addToCart
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
        collectGoods
        collectStore
        addToCart
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
