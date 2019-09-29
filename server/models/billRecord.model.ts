import { Schema, Model, model, Document } from 'mongoose';
import { number } from 'joi';

interface IBillRecord extends Document {
  // _id?: mongoose.Types.ObjectId
  // id?: string

  userid: string;
  toUserid?: string;
  amount: number;
  type: Type;

  fromBank: string;
  fromCard: string;
  fromUser: string;

  status: Status;
  remained: number;

  createdAt: number;
  updatedAt: number;
}

const BillRecordSchema: Schema = new Schema(
  {
    userid: {
      type: String,
      required: true
    },
    toUserid: {
      type: String,
      required: false
    },
    amount: {
      type: Number,
      required: true
    },

    type: {
      type: String,
      required: true
    },
    fromBank: {
      type: String
    },
    fromCard: {
      type: String
    },
    fromUser: {
      type: String
    },
    status: {
      type: String,
      required: true
    },
    remained: {
      type: Number
    },

    createdAt: {
      type: Number,
      default: 0
    },
    updatedAt: {
      type: Number,
      default: 0
    },
    resultRecordid: {
      type: String
    }
  },
  {
    versionKey: false
  }
);

enum Type {
  // 充值
  DEFAULT = 'DEFAULT',
  // 推广
  PROMOTION = 'PROMOTION',
  // 创建任务锁定
  TASK_LOCK = 'TASK_LOCK',
  // 放弃任务退款
  TASK_REFUNK = 'TASK_REFUNK',
  // 任务完成付款
  TASK_PAYMENT = 'TASK_PAYMENT',
  // 提现
  WITHDRAW = 'WITHDRAW'
}
enum Status {
  DEFAULT = 'DEFAULT',
  CHECKED = 'CHECKED'
}

const BillRecord: Model<IBillRecord> = model('BillRecord', BillRecordSchema);

export default BillRecord;
export { Type, Status, IBillRecord };
