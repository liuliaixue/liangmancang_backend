

import jwt from "jsonwebtoken"
import config from '../config/config'
import { IUser } from '../models/user.model';



function generateToken(user: IUser) {
  const payload = JSON.stringify(user);
  return jwt.sign(payload, config.jwtSecret);
}
export default { generateToken }