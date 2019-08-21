import Rule, { IRule, } from '../models/rule.model';
import rule from '../graphql/rule';



let currentRule: IRule = new Rule({
  buyerPercentage: 0,
  platformPercentage: 0,

  storePromotion: 0,
  buyerPromotion: 0,

  keyword: 0,
  image: 0,
  userArea: 0,
  userAge: 0,
  userGender: 0,
  userLevel: 0,
  userAntCreditPay: 0,
  userCollection: 0,

  createdAt: 0,
  updatedAt: 0,
})
let isCurrentRuleCached = false
const getCurrentRule = async () => {
  if (isCurrentRuleCached) {
    return currentRule
  } else {
    const ruleList = await Rule.find({}, null, { sort: { _id: -1 }, limit: 1 })
    if (ruleList.length !== 1) {
      throw new Error('invalid rule')
    }
    currentRule = ruleList[0]
    isCurrentRuleCached = true

  }
}
const refreshRule = async () => {
  const ruleList = await Rule.find({}, null, { sort: { _id: -1 }, limit: 1 })
  if (ruleList.length !== 1) {
    throw new Error('invalid rule')
  }
  currentRule = ruleList[0]
  isCurrentRuleCached = true
}

const gerCurrentRuleAmount = (rule: IRule) => {
  const {
    keyword = 0,
    image = 0,
    userArea = 0,
    userAge = 0,
    userGender = 0,
    userLevel = 0,
    userAntCreditPay = 0,
    userCollection = 0,
  } = rule

  return keyword + image + userArea + userAge +
    userGender + userLevel + userAntCreditPay + userCollection
}


setInterval(() => {
  refreshRule()
}, 1000)

const insert = async () => {

}

export default { getCurrentRule, gerCurrentRuleAmount }