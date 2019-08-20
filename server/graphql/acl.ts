import { IReq } from '../config/passport';

const requireAdmin = function (req: IReq) {
  if (req.user && req.user.roles.indexOf('admin') > -1)
    return true

  throw new Error('access error')
}
const requireUser = (req: IReq) => {
  if (req.user && req.user.roles)
    return true

  throw new Error('access error')
}

export default {
  requireAdmin,
  requireUser,
}
