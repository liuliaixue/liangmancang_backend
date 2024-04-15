import { Schema, Model, model, Document } from 'mongoose';
import { IBill } from './bill.model';
import { string, number } from 'joi';
import ID from './id.model';

enum Status {
  DEFAULT = 'DEFAULT',
  OK = 'OK',
  BAD = 'BAD',
  FREEZE = 'FREEZE'
}

export interface IUser extends Document {
  username: string;
  password: string;
  mobilePhone: string;
  hashedPassword: string;
  fullname: string;
  qq: string;
  idCard: string;
  bankCard: string;
  roles: string[];
  status: Status;
  createdAt: number;
  updatedAt: number;
  code: string;
  inviter: string;
  isTaskAutoCheck: boolean;
  bill: IBill | null;
  acls?: String[];
}

const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    hashedPassword: {
      type: String,
      required: true
    },
    mobilePhone: {
      type: String,
      required: true,
      unique: true
    },
    //   email: {
    //     type: String,
    //     required: false,
    //     unique: false,
    //     // Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
    //     match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
    //   },
    fullname: {
      type: String,
      required: false
    },
    code: {
      type: String,
      required: false
    },
    inviter: {
      type: String,
      required: false
    },
    isTaskAutoCheck: {
      type: Boolean,
      default: false
    },
    qq: {
      type: String,
      required: false
    },
    idCard: {
      type: String,
      required: false
    },
    bankCard: {
      type: String,
      required: false
    },
    status: {
      type: String,
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

    roles: [
      {
        type: String
      }
    ]
  },
  {
    versionKey: false
  }
);

// UserSchema.pre<IUser>('save', async function(next) {
//   if (!this.code) {
//     // const id = await ID.findOneAndUpdate(
//     //   { name: 'User' },
//     //   {
//     //     $inc: { value: 1 }
//     //   },
//     //   { upsert: true, new: true }
//     // );
//     // this.code = id.value;
//     this.code = shortid.generate()
//   }
//   next();
// });

const User = model('User', UserSchema);

export default User;
export { Status };
