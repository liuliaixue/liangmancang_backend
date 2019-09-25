import { IReq } from '../config/passport';
import roleCtrl from '../controllers/role.controller';
import logger from '../tools/logger';
import { aclCheck } from '../controllers/role.controller';

export default {
  newRole: async (obj: any, req: IReq) => {
    logger.info({ _from: 'newRole', _by: req.user.id, ...obj });
    aclCheck(req.user, 'newRole');

    const { name, acl } = obj;
    const role = await roleCtrl.newRole({ ...obj, name, acl });
    return role;
  },
  updateRole: async (obj: any, req: IReq) => {
    logger.info({ _from: 'updateRole', _by: req.user.id, ...obj });
    aclCheck(req.user, 'updateRole');

    const { name, acl, _id } = obj;
    const role = await roleCtrl.updateRole(_id, { ...obj, name, acl });
    return role;
  },
  removeRole: async (obj: any, req: IReq) => {
    logger.info({ _from: 'removeRole', _by: req.user.id, ...obj });
    aclCheck(req.user, 'removeRole');

    const { _id } = obj;
    const role = await roleCtrl.remove(_id);
    return 'removed';
  },
  roleList: async (obj: any, req: IReq) => {
    logger.info({ _from: 'roleList', _by: req.user.id, ...obj });
    aclCheck(req.user, 'roleList');

    const listObj = await roleCtrl.find({ ...obj });
    return listObj;
  }
};
