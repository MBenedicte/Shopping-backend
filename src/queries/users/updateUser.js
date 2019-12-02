import db from '../../models';

export default async (target, condition = {}) => {
  try {
    const user = await db.User.update(target, { where: condition });
    return user;
  } catch (error) {
    return { error };
  }
};
