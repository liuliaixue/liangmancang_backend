import { Schema, Model, model, Document } from "mongoose";

enum Status {
  DEFAULT = "DEFAULT",
  OK = "OK",
}

export interface INotice extends Document {
  type: string;
  title: string;
  content: string;

  updatedBy: string;
  createdAt: number;
  updatedAt: number;
}

const NoticeSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: false,
    },

    status: {
      type: String,
      required: false,
    },

    createdAt: {
      type: Number,
      default: 0,
    },
    updatedAt: {
      type: Number,
      default: 0,
    },
  },
  {
    versionKey: false,
  }
);

// const Notice: Model<INotice> = model('Notice', NoticeSchema);
const Notice = model("Notice", NoticeSchema);

export default Notice;
export { Status };
