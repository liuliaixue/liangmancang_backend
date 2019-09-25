const { client, adminClient } = require('./_graphql_client');

const config = require('./_config');
const assert = require('assert');

describe('graphql task', () => {
  const taskNumber = 5;
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
        total: ${taskNumber}
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
    `;

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
  it('ChildTaskList', async () => {
    const query = `mutation {
      childTaskList(skip: 0, limit: 10, status: DEFAULT) {
        list {
          _id
        }
        total
      }
    }`;
    const res = await client(query, {});

    assert(res.childTaskList.total > 0);
    assert(res.childTaskList.list.length > 0);
    // two children tasks
    config.childTask = res.childTaskList.list[0];
    config.childTask2 = res.childTaskList.list[1];
  });
  it('admin_childTaskList', async () => {
    const query = `mutation {
      admin_childTaskList(skip: 0, limit: 10, status: DEFAULT) {
        list {
          _id
        }
        total
      }
    }`;
    const res = await adminClient(query, {});
    assert(res.admin_childTaskList.total > 0);
  });

  it('updateTaskStatus: assigned', async () => {
    const query = `mutation {
      updateTaskStatus(_id: "${config.childTask._id}", status: ASSIGNED) {
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
`;
    const res = await adminClient(query, {});
    assert(res.updateTaskStatus.status === 'ASSIGNED');
    assert(res.updateTaskStatus.workerid === config.adminInfo._id);
  });

  it('updateTaskStatus: finished', async () => {
    const query = `mutation {
      updateTaskStatus(_id: "${config.childTask._id}", status: FINISHED) {
        _id
        parent
        status
        storeid
        userid
        workerid
        createdAt
        updatedAt
      }
    }`;
    const res = await client(query, {});
    assert(res.updateTaskStatus.status === 'FINISHED');
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
