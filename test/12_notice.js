const { client, adminClient } = require('./_graphql_client');
const config = require('./_config');
const assert = require('assert');

describe('graphql notice', () => {
  it('admin: new notcie', async () => {
    const query = `mutation{admin_newNotice(type:"default",title:"人民日报",content:"content1"){_id type title content userid createdAt updatedAt}}`;
    const res = await adminClient(query, {});
    assert(res.admin_newNotice.createdAt > 0);
    // console.log(res);
    config.notice = res.admin_newNotice;
  });

  it('get notice', async () => {
    const query = `query{notice(_id:"${config.notice._id}"){_id type title content userid createdAt updatedAt}}`;
    const res = await client(query);
    assert(res.notice.createdAt > 0);
  });

  it('noticeList', async () => {
    const query = `
      query{
        noticeList(skip: 0, limit: 10){
          list{
            _id
            type
            content
          }
          total
        }
      }`;
    const res = await client(query, {});
    assert(res.noticeList.list.length > 0);
  });

  // it('admin_updateNotice', async () => {
  //   const query = `mutation  {
  //       admin_updateNotice(
  //         _id: "${config.notice._id}"
  //         type: "xxxxx"
  //         title: "xxx"
  //         content: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  //       ) {
  //         _id
  //         type
  //         title
  //         content
  //         userid
  //         createdAt
  //         updatedAt
  //       }
  //     }`;
  //   const res = await adminClient(query);
  //   assert(res.admin_updateNotice.type === 'xxxxx');
  // });

  it('admin_removeNotice');
});
