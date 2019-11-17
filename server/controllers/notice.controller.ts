import Notice, { INotice } from '../models/notice.model';

const newNotice = async (notice: INotice) => {
  const now = new Date();
  notice.createdAt = now.getTime();
  notice.updatedAt = now.getTime();
  const savedNotice = await new Notice(notice).save();
  return savedNotice;
};

const update = async (_id: string, updateObj: INotice) => {
  const now = new Date();
  const check = await Notice.findByIdAndUpdate(
    _id,
    {
      $set: {
        ...updateObj,
        updatedAt: now.getTime()
      }
    },
    { new: true }
  );
  if (!check) {
    throw new Error('notice not found');
  }

  return check;
};

async function remove(_id: string) {
  const res = await Notice.findByIdAndRemove(_id);
  return res;
}
const find = async (query = { skip: 0, limit: 10 }) => {
  const { skip, limit } = query;
  const noticeList = await Notice.find()
    .skip(skip)
    .limit(limit);
  const noticeTotal = await Notice.count({});

  return { list: noticeList, total: noticeTotal };
};

const findById = async (_id: string) => {
  const check = await Notice.findById(_id);
  if (!check) {
    throw new Error('incorrect _id');
  }

  return check;
};
export default {
  newNotice,
  update,
  remove,
  find,
  findById
};
