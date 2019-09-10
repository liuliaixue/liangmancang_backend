test flow

## pretask

3 roles in this system: platform, buyer, store
there will be 3 users in tests: root(platform and buyer) and a user(store), a admin user(platform)

create default rules

```

db.getCollection('rules').insert({
    keyword: 1,
    image: 32,
    userArea: 1,
    userAge: 0.5,
    userGender: 0.5,
    userLevel: 1,
    userAntCreditPay: 2,
    userCollection: 2,})

```

## run test command

```
mocha test/00_admin.js \
test/01_user.js \
test/04_store.graphql.js \
test/05_billRecord.js \
test/07_task.js \
test/08_checkIn.js \
test/09_reason.js \
test/10_message.js \
test/11_role.js

```

### User

1.  register admin
    1. register a user, update it's role to root
    1. admin user login
1.  register a user
    1. login
1.  user
    1. update userInfo
    1. update password
    1. login with new password
1.  admin
    1. admin login
    1. admin check user status
    1. admin userList

### Store

1. bindStore
1. update storeInfo
1. admin
   1. admin update store status
   1. admin storeList

### Bill and BillRecord

1. admin
   1. admin charge
   1. admin charge check
   1. admin withdraw
   1. admin withdraw check
   1. admin billRecordList
1. billRecordList

### Task

1. new Task
   1. updateTaskStatus: assigned
   1. updateTaskStatus: finished
   1. updateTaskStatus: appeal
   1. updateTaskStatus: abort
   1. taskList
      <!-- 1. taskList(parent) -->
1. admin taskList
   1. admin taskList
   1. admin taskList(userid, parent, status)

#### checkin

1. new Checkin
   1. checkList
1. admin
   1. checkList

#### reason

1. admin new reason
   1. admin new reason
   1. admin remove Reason
   1. admin reasonList

#### message

1. new message
   1. update message
   1. messageList
1. admin
   1. admin new message
   1. admin update message
   1. admin message list

#### admin management

1. role
   1. admin: get acl
   1. admin new role
   1. admin update role
   1. admin remove role
   1. admin role list
1. admin user
   1. admin new admin user
   1. admin: reset user password
   1. admin: freeze user(store or buyer)
   1. admin: disable admin
   1. admin: admin user list
1. admin set user admin
   1. disable admin user
