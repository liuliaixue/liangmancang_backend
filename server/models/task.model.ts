import { Schema, Model, model, Document } from 'mongoose';
import { Stats } from 'fs';

enum Status {
  DEFAULT = 'DEFAULT',
  ASSIGNED = 'ASSIGNED',
  APPEAL = 'APPEAL',
  FINISHED = 'FINISHED',
  ABORT = 'ABORT'
}
const StatusList = [
  Status.DEFAULT,
  Status.ASSIGNED,
  Status.APPEAL,
  Status.FINISHED,
  Status.ABORT
].sort();
export interface ITask extends Document {
  parent: string;
  orderNumber: string;

  goodsName: string;
  goodsLink: string;
  goodsImage: string;
  goodsPrice: number;
  goodsTotal: number;
  goodsPriceShowed: number;
  goodsSpecification: string;
  isFreeShipping: boolean;
  howToFindGoods: string;

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
  workerid: string;
  startAt: number;

  createdAt: number;
  updatedAt: number;
}

const TaskSchema = new Schema(
  {
    parent: {
      type: String
    },
    orderNumber: {
      type: String
    },

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
    workerid: {
      type: String
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
export { Status, StatusList };
