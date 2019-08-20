import { Schema, Model, model, Document } from 'mongoose';

export interface IRule extends Document {
  buyerPercentage: number,
  platformPercentage: number,

  storePromotion: number,
  buyerPromotion: number,

  keyword: number,
  image: number,
  userArea: number,
  userAge: number,
  userGender: number,
  userLevel: number,
  userAntCreditPay: number,
  userCollection: number,

  createdAt: number
  updatedAt: number

}

const RuleSchema = new Schema({
  buyerPercentage: Number,
  platformPercentage: Number,

  storePromotion: Number,
  buyerPromotion: Number,

  keyword: Number,
  image: Number,
  userArea: Number,
  userAge: Number,
  userGender: Number,
  userLevel: Number,
  userAntCreditPay: Number,
  userCollection: Number,


  // status: Number,
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


const Rule: Model<IRule> = model('Rule', RuleSchema);

export default Rule 