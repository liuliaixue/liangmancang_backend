// test config

// 请求服务器的数据带上 `info`, 没有的直接些对应信息

module.exports = {
  baseURL: 'http://localhost:4040',
  admin: {
    username: `A${Date.now()}`,
    password: 'a123456',
    mobilePhone: '1' + Date.now().toString().slice(3, 13),
  },
  user: {
    username: `U${Date.now()}`,
    password: '123456',
    mobilePhone: '1' + (Date.now()+1).toString().slice(3, 13),
  },
  token: '',
  userInfo: {},
  adminToken: '',
  adminInfo: {},

  charge: {},
  withdraw: {},

  task: {},
  message: {},
}
// console.log(module.exports)