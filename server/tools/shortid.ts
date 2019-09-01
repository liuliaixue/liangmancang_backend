import shortid = require('shortid');

shortid.seed(process.pid|| 1)

export default shortid