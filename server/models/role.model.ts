import { Schema, Model, model, Document } from 'mongoose';

export interface IRole extends Document {
  name: string;
  acl: string[];
  createdAt: number;
  updatedAt: number;
}
const CheckInSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    acl: {
      type: [String],
      require: true
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

// const Role: Model<IRole> = model('Role', CheckInSchema);
const Role = model('Role', CheckInSchema);

export default Role;
