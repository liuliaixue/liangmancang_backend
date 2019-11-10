import { Schema, Model, model, Document } from 'mongoose';
import { stream } from 'winston';

export interface IMessage extends Document {
  content: string;
  taskid: string;
  type: string;
  chatroom: string;
  userid: string;
  image: string;
  phone: string;
  createdAt: number;
  updatedAt: number;
}

const MessageSchema = new Schema(
  {
    content: { type: String, required: true },
    taskid: { type: String },
    type: { type: String },
    chatroom: { type: String },
    image: { type: String },
    phone: { type: String },

    userid: { type: String, required: true },
    createdAt: { type: Number, default: 0 },
    updatedAt: { type: Number, default: 0 }
  },
  {
    versionKey: false
  }
);

const Message: Model<IMessage> = model('Message', MessageSchema);

export default Message;
