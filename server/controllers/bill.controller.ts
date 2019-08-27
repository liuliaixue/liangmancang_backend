import Bill from '../models/bill.model'



async function findOne(query: object) {
  const check = await Bill.findOne(query)
  if (!check) {
    throw new Error(`incorrect query ${JSON.stringify(query)}`)
  }
  return check
}


export default {
  findOne,
  findById: async (_id: string) => {
    const bill = await Bill.findById(_id)
    return bill
  }
}