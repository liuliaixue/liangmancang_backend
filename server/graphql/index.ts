import Query from './Query'
import user from './user'
import store from './store'
import billRecord from './billRecord'
import task from './task'
import rule from './rule'

interface IGraphqlObj {
  [key: string]: object
}

const safeMerge = (objList: any) => {
  var merged: IGraphqlObj = {}

  for (let obj of objList) {
    Object.keys(obj).forEach((key: string) => {
      if (merged[key]) {
        throw new Error('merge obj with repeated key')
      }
      merged[key] = obj[key]
    })
  }
  return merged
}

export default safeMerge([
  Query,
  user,
  store,
  billRecord,
  task
])