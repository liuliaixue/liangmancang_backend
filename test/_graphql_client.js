const { GraphQLClient } = require('graphql-request');
const fs = require('fs');
const path = require('path');
const config = require('./_config');
const { baseURL } = config;

//const token = fs.readFileSync(path.join(__dirname, '_token'), 'utf8');

const q = `{
  Movie(title: "Inception") {
    releaseDate
    actors {
      name
    }
  }
}`;

const client = (query, variables) => {
  return new Promise((resolve, reject) => {
    const client = new GraphQLClient(`${baseURL}/api/graphql`, {
      headers: { 'x-lmc-token': config.token }
    });
    client
      .request(query, variables)
      .then(data => {
        resolve(data);
      })
      .catch(e => {
        resolve(e.response);
      });
  });
};
const adminClient = (query, variables) => {
  return new Promise((resolve, reject) => {
    const client = new GraphQLClient(`${baseURL}/api/graphql`, {
      headers: { 'x-lmc-token': config.adminToken }
    });
    client
      .request(query, variables)
      .then(data => {
        resolve(data);
      })
      .catch(e => {
        resolve(e.response);
      });
  });
};

module.exports = {
  client,
  adminClient
};
