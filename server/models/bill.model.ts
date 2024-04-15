import { Schema, Model, model, Document } from 'mongoose';
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
export interface IBill extends Document {
  total: number;
  remained: number;
  freeze: number;
  withdraw: number;

  type: Type;
  amount: number;

  fromBank: string;
  fromCard: string;
  fromUser: string;

  status: Status;
  userid: string;
  updatedBy: string;
  createdAt: number;
  updatedAt: number;
}

const BillSchema: Schema = new Schema(
  {
    total: { type: Number, required: true },
    remained: { type: Number, required: true },
    freeze: { type: Number, required: true },
    withdraw: { type: Number, required: true },
    type: { type: String },
    amount: { type: Number },
    fromBank: { type: String },
    fromCard: { type: String },
    fromUser: { type: String },

    status: { type: String },
    userid: { type: String },
    updatedBy: { type: String },

    createdAt: { type: Number, default: 0 },
    updatedAt: { type: Number, default: 0 }
  },
  {
    versionKey: false
  }
);

// const Bill: Model<IBill> = model('Bill', BillSchema);
const Bill = model('Bill', BillSchema);

export default Bill;
export { Type, Status };
