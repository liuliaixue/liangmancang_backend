import User, { IUser } from '../models/user.model';
import Err from '../tools/error';
import Role, { IRole } from '../models/role.model';
import { promises } from 'dns';

const ACL = [
  { name: 'admin_no', des: '无权限' },
  { name: 'admin_all', des: '全部权限' }, // all persmission
  { name: 'admin_role', des: '' },
  { name: 'admin_admin_user', des: '' },

  { name: 'admin_user', des: '' },
  { name: 'admin_store', des: '' },

  { name: 'admin_bill', des: '' },
  { name: 'admin_billRecord', des: '' },
  { name: 'admin_billRecord_new', des: '' },
  { name: 'admin_billRecord_check', des: '' },
  { name: 'admin_task', des: '' },
  { name: 'admin_checkin', des: '' },
  { name: 'admin_reason', des: '' },
  { name: 'admin_message', des: '' }
];
const AclNameList: string[] = [];

ACL.forEach(item => AclNameList.push(item.name));
const isValidACL = (aclList: [string]) => {
  let valid = true;
  for (let acl of aclList) {
    if (AclNameList.indexOf(acl) < 0) {
      valid = false;
      break;
    }
  }
  return valid;
};

const aclCheck = async (user: IUser, api: string) => {
  if (
    user &&
    user.roles &&
    user.roles.length &&
    user.roles.indexOf('root') > -1
  ) {
    return;
  }
  const check = await User.findById(user.id);
  if (!check) {
    throw Err.NotFound(`userid:${user.id}`);
  }
  if (check && check.roles && check.roles.length) {
    const promises = check.roles.map(
      role =>
        new Promise<IRole>(async (r, e) => {
          try {
            const roleInfo = await Role.findOne({ name: role });
            if (!roleInfo) {
              e(`invalid role name=${role}`);
              return;
            }
            r(roleInfo);
          } catch (error) {
            e(error);
          }
        })
    );
    const roles = await Promise.all(promises);

    let acls: string[] = [];
    roles.forEach(role => {
      acls.concat(role.acl);
    });
    if (acls.indexOf(api) > -1) {
      return;
    }
  }

  throw new Error(`no permission`);
};

export default {};

export { aclCheck };
