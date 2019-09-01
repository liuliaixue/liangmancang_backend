# 粮满仓后端

# before you start

1. create default rule in mongo

```
db = db.getSiblingDB('lmc');
db.getCollection('rules').insert({
    keyword: 1,
    image: 32,
    userArea: 1,
    userAge: 0.5,
    userGender: 0.5,
    userLevel: 1,
    userAntCreditPay: 2,
    userCollection: 2
})

```

1. if need, create root/admin user

# start server and test

```
npm i
npm run build
npm start

npm install mocha -g
mocha
```
