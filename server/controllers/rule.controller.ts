import  Rule,{ IRule, } from '../models/rule.model';



let currentRule: IRule
const getCurrentRule = async () => {
  if (currentRule) {
    return currentRule
  } else {
    const ruleList = await Rule.find({}, null, { sort: { _id: -1 }, limit: 1 })
    if (ruleList.length !== 1) {
      throw new Error('invalid rule')
    }
    currentRule = ruleList[0]

  }
}
const refreshRule = async () => {
  const ruleList = await Rule.find({}, null, { sort: { _id: -1 }, limit: 1 })
  if (ruleList.length !== 1) {
    throw new Error('invalid rule')
  }
  currentRule = ruleList[0]
}

setInterval(() => {
  refreshRule()
}, 1000)

const insert = async () => {

}

export default { getCurrentRule }