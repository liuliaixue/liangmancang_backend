import { Schema, Model, model, Document } from 'mongoose';

enum Status {
  DEFAULT,
  ASSIGNED,
  APPEAL,
  FINISHED,
}
export interface ITask extends Document {
  parent: string
  orderNumber: string

  goodsName: string
  goodsLink: string
  goodsImage: string
  goodsPrice: number
  amount: number
  goodsPriceShowed: number
  specification: string
  isFreeShipping: boolean
  howToFindTask: string

  startTime: number
  endTime: number
  total: number

  commission: number
  platformServiceFee: number
  platformCommission: number

  extraCommission: number
  extraImages: [string]
  remark: string


  status: Status

  storeid: string
  userid: string
  workerid: string



  createdAt: number
  updatedAt: number
}

const TaskSchema = new Schema({
  parent: {
    type: String,
  },
  orderNumber: {
    type: String,
  },

  goodsName: {
    type: String,
  },
  goodsLink: {
    type: String,
  },
  goodsImage: {
    type: String,
  },
  goodsPrice: {
    type: Number,
  },
  amount: {
    type: Number,
  },
  goodsPriceShowed: {
    type: Number,
  },
  specification: {
    type: String,
  },
  isFreeShipping: {
    type: Boolean,
  },
  howToFindTask: {
    type: String,
  },


  startTime: {
    type: Number,
  },
  endTime: {
    type: Number,
  },
  total: {
    type: Number,
  },

  commission: {
    type: Number,
  },
  platformServiceFee: {
    type: Number,
  },
  platformCommission: {
    type: Number,
  },

  extraCommission: {
    type: Number,
  },
  extraImages: {
    type: [String],
  },
  remark: {
    type: String,
  },



  status: {
    type: Number,
  },

  storeid: {
    type: String,
  },
  userid: {
    type: String,
  },
  workerid: {
    type: String,
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





const Task: Model<ITask> = model('Task', TaskSchema);


export default Task
export { Status }