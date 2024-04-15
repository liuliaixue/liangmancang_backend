import { Schema, Model, model, Document } from 'mongoose';
import { Type as OrderType, Status as OrderStaus } from './order.model';
import { string } from 'joi';

enum Status {
  DEFAULT = 'DEFAULT',
  CONFIRMED = 'CONFIRMED',
  CHECKED = 'CHECKED',
  BAD = 'BAD',
  AUTO_CHECKED = 'AUTO_CHECKED'
}
enum TaskPlatform {
  TMALL = 'TMALL',
  TAOBAO = 'TAOBAO'
}
enum TaskType {
  MOBILE_TAOBAO = 'MOBILE_TAOBAO',
  MOBILE_TAOBAO_PRESALE = 'MOBILE_TAOBAO_PRESALE',
  MOBILE_TMALL = 'MOBILE_TMALL',
  MOBILE_TAOBAO_SPECIAL = 'MOBILE_TAOBAO_SPECIAL',
  PC_TAOBAO_REFUND = 'PC_TAOBAO_REFUND',
  PC_TAOBAO = 'PC_TAOBAO'
}

export interface IOrderInput {
  type: OrderType;

  buyTimes: number;
  browseTimes: number;
  collectTimes: number;

  collectGoods: boolean;
  collectStore: boolean;
  addToCart: boolean;

  searchKeyword: string;
  goodsSpecification: string;

  comment: string;
  pictures: [string];
  remark: string;
  status: OrderStaus;
}

export interface ITask extends Document {
  platform: TaskPlatform;
  type: TaskType;

  goodsName: string;
  goodsLink: string;
  goodsImage: string;
  goodsPrice: number;
  goodsTotal: number;
  goodsPriceShowed: number;
  goodsSpecification: string;
  isFreeShipping: boolean;
  search_sort: string;
  search_ReceiverNum: number;
  search_price_from: number;
  search_price_to: number;
  search_where: string;
  search_keywrod: string;

  orders: [IOrderInput];

  startTime: number;
  endTime: number;
  orderQuantity: number;

  commission: number;
  platformServiceFee: number;
  platformCommission: number;

  extraCommission: number;
  extraImages: [string];
  remark: string;

  status: Status;

  storeid: string;
  userid: string;
  amount: number;

  message: string;

  createdAt: number;
  updatedAt: number;
}

const TaskSchema = new Schema(
  {
    platform: { type: String },
    type: { type: String },
    goodsName: { type: String },
    goodsLink: {
      type: String
    },
    goodsImage: {
      type: String
    },
    goodsPrice: { type: Number },
    goodsTotal: {
      type: Number
    },
    goodsPriceShowed: {
      type: Number
    },
    goodsSpecification: {
      type: String
    },
    isFreeShipping: {
      type: Boolean
    },

    search_sort: { type: String },
    search_ReceiverNum: { type: Number },
    search_price_from: { type: Number },
    search_price_to: { type: Number },
    search_where: { type: String },
    search_keyword: { type: String },

    orders: {},
    startTime: { type: Number },
    endTime: { type: Number },
    orderQuantity: { type: Number },

    commission: {
      type: Number
    },
    platformServiceFee: {
      type: Number
    },
    platformCommission: {
      type: Number
    },

    extraCommission: {
      type: Number
    },
    extraImages: {
      type: [String]
    },
    remark: {
      type: String
    },

    status: {
      type: String,
      required: true
    },

    storeid: {
      type: String
    },
    userid: {
      type: String
    },

    amount: {
      type: Number
    },
    message: { type: String },

    createdAt: {
      type: Number,
      default: 0
    },
    updatedAt: {
      type: Number,
      default: 0
    }
  },
  {
    versionKey: false
  }
);

const Task = model('Task', TaskSchema);

export default Task;
export { Status };
