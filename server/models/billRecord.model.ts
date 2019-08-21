
import { Schema, Model, model, Document } from 'mongoose';

interface IBillRecord extends Document {
  // _id?: mongoose.Types.ObjectId
  // id?: string

  userid: string
  toUserid?: string
  amount: number
  type: Type
  status: Status
  createdAt: number
  updatedAt: number
}

const BillRecordSchema: Schema = new Schema({

  userid: {
    type: String,
    required: true,
  },
  toUserid: {
    type: String,
    required: false,
  },
  amount: {
    type: Number,
    required: true
  },

  type: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
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


}, {
    versionKey: false
  });



enum Type {
  DEFAULT = "DEFAULT",
  PROMOTION = "PROMOTION",
  TASK_LOCK = "TASK_LOCK",
  TASK_REFUNK = "TASK_REFUNK",
  TASK_PAYMENT = "TASK_PAYMENT",
  WITHDRAW = "WITHDRAW"


}
enum Status {
  DEFAULT = "DEFAULT",
  CHECKED = "CHECKED",
}

const BillRecord: Model<IBillRecord> = model('BillRecord', BillRecordSchema);

export default BillRecord;
export { Type, Status, IBillRecord };


