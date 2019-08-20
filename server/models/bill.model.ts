import { Schema, Model, model, Document } from 'mongoose';

export interface IBill extends Document {
  userid: string
  total: number
  remained: number
  freeze: number
  withdraw: number
  createdAt: number
  updatedAt: number
}

const BillSchema: Schema = new Schema({

  userid: {
    type: String,
    required: true,
    unique: true,
  },
  total: {
    type: Number,
    required: true,
  },
  remained: {
    type: Number,
    required: true,
  },
  freeze: {
    type: Number,
    required: true,
  },
  withdraw: {
    type: Number,
    required: true,
  },


  createdAt: {
    type: Number,
    default: 0
  },
  updatedAt: {
    type: Number,
    default: 0
  },

}, {
    versionKey: false
  });


const Bill: Model<IBill> = model('Bill', BillSchema);

export default Bill 