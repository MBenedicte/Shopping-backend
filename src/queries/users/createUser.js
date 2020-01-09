import db from '../../models';

const createUserQuery = async data => {
  try {
    const user = await db.User.create(data, { logging: false });
    return user;
  } catch (error) {
    return { error };
  }
};
export default createUserQuery;
