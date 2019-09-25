const client = require('axios');

const baseURL = 'http://101.132.64.25:60000';
//const baseURL = 'http://localhost:4040';
const user = {
  username: '18817570745',
  //  mobilePhone: '18817570745',
  password: '123456'
};
// it('register', async () => {
//   const res = await client
//     .post(`${baseURL}/api/auth/register`, user)
//     .catch(e => console.log(e.response.data));
//   console.log(res.data);
// });

it('login', async () => {
  const res = await client
    .post(`${baseURL}/api/auth/login`, {
      //username: '18817570745',
      username: 'U1569336817278',
      password: '123456' + 1
    })
    .catch(e => console.log(e.response.data));

  console.log(res);
});

async function it(name, fun) {
  await fun();
}
