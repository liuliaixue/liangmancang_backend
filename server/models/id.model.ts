import { Schema, Model, model, Document } from 'mongoose';


export interface IID extends Document {
  name: string
  value: number
}

const IDSchema: Schema = new Schema({


  name: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true,
  },

}, {
    versionKey: false
  });


// const ID: Model<IID> = model('ID', IDSchema);
const ID = model('ID', IDSchema);

export default ID