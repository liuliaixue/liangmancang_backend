
const config = require('./_config')
const assert = require('assert')
const client = require('./_client')

describe('User', function () {

  it('verify token', async () => {
    const res = await client.get('/api/auth/me')

  })
});
