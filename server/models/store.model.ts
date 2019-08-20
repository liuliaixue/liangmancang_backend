import { Schema, Model, model, Document } from 'mongoose';

export interface IStore extends Document {
  name: string
  userid: string
  type: string
  website: string
  wangwang: string
  storeScreenShotImage: string
  address: string
  contactPhone: string
  status: Status
  createdAt: number
  updatedAt: number
}

enum Status {
  DEFAULT,
  OK,
  BAD
}

const StoreSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  userid: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  website: {
    type: String,
  },

  wangwang: {
    type: String,
  },

  storeScreenShotImage: {
    type: String,
  },

  address: {
    type: String,
  },

  contactPhone: {
    type: String,
  },

  status: {
    type: Number,
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


const Store: Model<IStore> = model('Store', StoreSchema);

export default Store
export { Status }