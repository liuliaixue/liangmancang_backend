import Rule, { IRule } from '../models/rule.model';
import logger from '../tools/logger';
import { ITask } from '../models/task.model';
import { Type as OrderType, IOrder } from '../models/order.model';

let currentRule  = {
  buyerPercentage: 0.55,
  platformPercentage: 0.45,

  storePromotion: 0,
  buyerPromotion: 0,

  keyword: 0,
  image: 0,
  userArea: 0,
  userAge: 0,
  userGender: 0,
  userLevel: 0,
  userAntCreditPay: 0,

  userCollection: 60, // 用户收藏费用
  userBrowse: 60, // 用户浏览费用

  OrderBaseCommission: 1000, // 订单基础佣金
  OrderShippingDeposit: 1000, // 运费押金

  createdAt: 0,
  updatedAt: 0
};
const getCurrentRule = async () => {
  return currentRule;
};
const refreshRule = async () => {
  const ruleList = await Rule.find({}, null, { sort: { _id: -1 }, limit: 1 });
  if (ruleList.length !== 1) {
    logger.error({ _from: '', message: 'invalid rule' });
    return;
  }
  currentRule = ruleList[0];
};

const gerCurrentRuleAmount = (rule: IRule) => {
  const {
    keyword = 0,
    image = 0,
    userArea = 0,
    userAge = 0,
    userGender = 0,
    userLevel = 0,
    userAntCreditPay = 0,
    userCollection = 0
  } = rule;

  return (
    keyword +
    image +
    userArea +
    userAge +
    userGender +
    userLevel +
    userAntCreditPay +
    userCollection
  );
};

const getOrderPrice = () => {};
const gerCurrentTaskAmount = (task: ITask) => {
  const {
    keyword = 0,
    image = 0,
    userArea = 0,
    userAge = 0,
    userGender = 0,
    userLevel = 0,
    userAntCreditPay = 0,

    userCollection = 0, // 用户收藏费用
    userBrowse = 0,
    OrderBaseCommission = 0, // 订单基础佣金
    OrderShippingDeposit = 0 // 运费押金
  } = currentRule;

  if (!task.orders.length) {
    throw new Error('invalid task order length');
  }
  let allCommission = 0;
  let allDeposit = 0;
  task.orders.forEach(order => {
    allCommission +=
      OrderBaseCommission +
      userBrowse * order.browseTimes +
      userCollection * order.collectTimes +
      task.extraCommission;
    allDeposit =
      (task.isFreeShipping ? 0 : OrderShippingDeposit) +
      order.buyTimes * task.goodsPrice * task.goodsTotal;
  });

  return { allCommission, allDeposit };
};

const getCurrentOrderAmount = (order: IOrder, task: ITask) => {
  const {
    buyerPercentage = 0,
    keyword = 0,
    image = 0,
    userArea = 0,
    userAge = 0,
    userGender = 0,
    userLevel = 0,
    userAntCreditPay = 0,
    userCollection = 0, // 用户收藏费用
    userBrowse = 0,
    OrderBaseCommission = 0, // 订单基础佣金
    OrderShippingDeposit = 0 // 运费押金
  } = currentRule;

  const userCommission =
    (userBrowse * order.browseTimes + userCollection * order.collectTimes) *
      buyerPercentage +
    task.extraCommission;

  return { userCommission };
};

setInterval(() => {
  refreshRule();
}, 1000);

const insert = async () => {};

export default {
  getCurrentRule,
  gerCurrentRuleAmount,
  gerCurrentTaskAmount,
  getCurrentOrderAmount
};
