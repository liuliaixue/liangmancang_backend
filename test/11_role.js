const { client, adminClient } = require('./_graphql_client');
const config = require('./_config');
const assert = require('assert');

describe('graphql message', () => {
  it('admin: get acl', async () => {
    // const query = ``;
    // const res = await adminClient(query, {});
    // assert(res);
  });
  it('admin new role');
  it('admin update role');
  it('admin role list');

  it('admin: new admin user');
  it('admin: reset user password');
  it('admin: freeze user(store or buyer)');
  it('admin: disable admin');
  it('admin: admin user list');

  it('admin: set user as admin');
  it('admin: disable admin user');
});
