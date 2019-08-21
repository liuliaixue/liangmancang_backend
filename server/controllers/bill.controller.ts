import Bill from '../models/bill.model'



async function findOne(filter: object) {
  const check = await Bill.findOne(filter)
  if (!check) {
    throw new Error(`incorrect filter ${JSON.stringify(filter)}`)
  }
  return check
}
export default {
  findOne

}