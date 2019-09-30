// test config

// 请求服务器的数据带上 `info`, 没有的直接些对应信息
const now = Date.now();
let currentPhoneCounter = 0;
const ramdomMobilePhone = () => {
  currentPhoneCounter++;
  return '1' + (now + currentPhoneCounter).toString().slice(3, 13);
};

module.exports = {
  ramdomMobilePhone,
  baseURL: 'http://localhost:4040',
  admin: {
    username: `A${now}`,
    password: 'a123456',
    mobilePhone: ramdomMobilePhone()
  },
  user: {
    username: `U${now}`,
    password: '123456',
    mobilePhone: ramdomMobilePhone()
  },

  user2: {
    username: `U2`,
    password: '123456',
    mobilePhone: ramdomMobilePhone()
  },
  user3: {
    username: `U2${new Array(100).join('a')}`,
    password: '123456',
    mobilePhone: ramdomMobilePhone()
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
