
const { GraphQLClient } = require('graphql-request')
const fs = require('fs')
const path = require('path')


const token = fs.readFileSync(
  path.join(__dirname, '_token'),
  "utf8"
)
const baseURL = 'http://localhost:4040'


const q = `{
  Movie(title: "Inception") {
    releaseDate
    actors {
      name
    }
  }
}`


const req = (query, variables) => {
  return new Promise((resovle, reject) => {
    const client = new GraphQLClient(`${baseURL}/api/graphql`, {
      headers: { 'x-lmc-token': config.token || token }
    })
    client.request(query, variables)
      .then(data => {
        resovle(data)
      })
      .catch(e => { throw e })
  })
}

module.exports = req