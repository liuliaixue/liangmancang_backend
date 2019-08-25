import { Schema, Model, model, Document } from 'mongoose';

export interface ICheckIn extends Document {
  userid: string
  createdAt: number
  updatedAt: number
}

const CheckInSchema: Schema = new Schema({

  userid: {
    type: String,
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


const CheckIn: Model<ICheckIn> = model('CheckIn', CheckInSchema);

export default CheckIn 