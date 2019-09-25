// test config

// 请求服务器的数据带上 `info`, 没有的直接些对应信息
const now = Date.now();

module.exports = {
  baseURL: 'http://localhost:4040',
  admin: {
    username: `A${now}`,
    password: 'a123456',
    mobilePhone: '1' + now.toString().slice(3, 13)
  },
  user: {
    username: `U${now}`,
    password: '123456',
    mobilePhone: '1' + (now + 1).toString().slice(3, 13)
  },
  user2: {
    username: `U2`,
    password: '123456',
    mobilePhone: '1' + (now + 2).toString().slice(3, 13)
  },
  user3: {
    username: `U2${new Array(100).join('a')}`,
    password: '123456',
    mobilePhone: '1' + (now + 2).toString().slice(3, 13)
  },
  token: '',
  userInfo: {},
  adminToken: '',
  adminInfo: {},

  charge: {},
  withdraw: {},

  task: {},
  message: {}
};
// console.log(module.exports)
