
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
    required: true,
  },
  amount: {
    type: Number,
    required: true
  },

  type: {
    type: Number,
    required: false
  },
  status: {
    type: Number,
    required: false
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
  DEFAULT,
  PROMOTION,
  TASK_LOCK,
  TASK_REFUNK,
  TASK_PAYMENT,
  WITHDRAW


}
enum Status {
  DEFAULT,
  CHECKED,
}

const BillRecord: Model<IBillRecord> = model('BillRecord', BillRecordSchema);

export default BillRecord;
export { Type, Status, IBillRecord };


