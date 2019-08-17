
const { GraphQLClient } = require('graphql-request')
const fs = require('fs')
const path = require('path')


const token = fs.readFileSync(
    path.join(__dirname, '_token'),
    "utf8"
)
const baseURL = 'http://localhost:4040'
const client = new GraphQLClient(`${baseURL}/api/graphql`, {
    headers: { 'x-lmc-token': token }
})

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
        client.request(query, variables)
            .then(data => {
                resovle(data)
            })
            .catch(e => { throw e })
    })
}

module.exports = req