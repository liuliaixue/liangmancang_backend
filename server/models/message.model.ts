import { Schema, Model, model, Document } from 'mongoose';

export interface IMessage extends Document {
  content: string
  taskid: string
  userid: string
  createdAt: number
  updatedAt: number
}

const MessageSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  taskid: {
    type: String,
  },
  userid: {
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


}, {
    versionKey: false
  });


const Message: Model<IMessage> = model('Message', MessageSchema);

export default Message 