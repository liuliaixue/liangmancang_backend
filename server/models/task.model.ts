import { Schema, Model, model, Document } from 'mongoose';
import { Type as OrderType, Status as OrderStaus } from './order.model';

enum Status {
  DEFAULT = 'DEFAULT',
  CONFIRMED = 'CONFIRMED',
  CHECKED = 'CHECKED',
  AUTO_CHECKED = 'AUTO_CHECKED'
}

export interface IOrderInput {
  type: OrderType;

  buyTimes: number;
  browseTimes: number;
  collectTimes: number;
  collect: string;

  searchKeyword: string;
  goodsSpecification: string;

  comment: string;
  pictures: [string];
  remark: string;
  status: OrderStaus;
}

export interface ITask extends Document {
  goodsName: string;
  goodsLink: string;
  goodsImage: string;
  goodsPrice: number;
  goodsTotal: number;
  goodsPriceShowed: number;
  goodsSpecification: string;
  isFreeShipping: boolean;
  howToFindGoods: string;
  orders: [IOrderInput];

  startTime: number;
  endTime: number;
  total: number;

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

  createdAt: number;
  updatedAt: number;
}

const TaskSchema = new Schema(
  {
    goodsName: {
      type: String
    },
    goodsLink: {
      type: String
    },
    goodsImage: {
      type: String
    },
    goodsPrice: {
      type: Number
    },
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

    howToFindGoods: {
      type: String
    },

    orders: {},
    startTime: {
      type: Number
    },
    endTime: {
      type: Number
    },
    total: {
      type: Number
    },

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

const Task: Model<ITask> = model('Task', TaskSchema);

export default Task;
export { Status };
