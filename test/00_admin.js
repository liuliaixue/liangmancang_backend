const config = require('./_config');
const assert = require('assert');
const client = require('./_client')();
const { execSync } = require('child_process');

const User = require('../dist/models/user.model').default;
const connectMongo = require('../dist/config/mongoose');
const mongoose = require('mongoose');

describe('Admin', function() {
  it('create admin user', async () => {
    const { admin } = config;
    const res = await client.post('/api/auth/register', admin);
    assert(res.data.user.username === admin.username);
    const adminInfo = res.data.user;
    // const script = `"
    //   db = db.getSiblingDB('lmc');

    //   db.getCollection('users').update({_id:ObjectId('${adminInfo._id}')},{
    //     \\$set:{
    //         'roles' : ['root'],
    //       }
    //   });
    // "`;
    // execSync(`mongo --eval ${script.replace(/\n/gi, ' ')}`, {});

    const r = await User.findByIdAndUpdate(
      adminInfo._id,
      {
        $set: { roles: ['root'] }
      },
      { new: true }
    );
    // console.log(r);
    assert(r.roles.length === 1);
    mongoose.disconnect();
  });

  it('admin login', async () => {
    const res = await client.post('/api/auth/login', config.admin);
    assert(res.data.user.username === config.admin.username);
    config.adminInfo = res.data.user;
    config.adminToken = res.data.token;
    var fs = require('fs');
    const path = require('path');
    fs.writeFileSync(path.join(__dirname, '_tokenAdmin'), res.data.token);
  });

  it('admin login 2', async () => {
    const res = await client.post('/api/auth/adminlogin', config.admin);

    assert(res.data.user.username === config.admin.username);
    assert(res.data.acls.length > 0);
  });
});
