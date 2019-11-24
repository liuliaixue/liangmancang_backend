import { Schema, Model, model, Document } from 'mongoose';

enum Status {
  DEFAULT = 'DEFAULT',
  ASSIGNED = 'ASSIGNED',
  CONFIRM = 'CONFIRM',
  FINISHED = 'FINISHED',
  ABORT = 'ABORT'
}
enum Type {
  DEFAULT = 'DEFAULT',
  WORD_COMMENT = 'WORD_COMMENT',
  PICTURE_COMMENT = 'PICTURE_COMMENT'
}

export interface IOrder extends Document {
  taskid: string;
  type: Type;

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
  status: Status;

  userid: string;
  workerid: string;

  startAt: number;

  createdAt: number;
  updatedAt: number;
}

const OrderSchema = new Schema(
  {
    taskid: { type: String },
    type: { type: String },

    buyTimes: { type: Number },
    browseTimes: { type: Number },
    collectTimes: { type: Number },

    collectGoods: { type: Boolean },
    collectStore: { type: Boolean },
    addToCart: { type: Boolean },

    searchKeyword: { type: String },
    goodsSpecification: { type: String },

    comment: { type: String },
    pictures: { type: [String] },
    remark: { type: String },
    status: { type: String },

    userid: { type: String },
    workerid: { type: String },

    startAt: { type: Number },

    createdAt: { type: Number },
    updatedAt: { type: Number }
  },
  {
    versionKey: false
  }
);

const Order: Model<IOrder> = model('Order', OrderSchema);

export default Order;
export { Status, Type };
