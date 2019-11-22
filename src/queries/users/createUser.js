import db from '../../models';

const createUserQuery = async data => {
  try {
    const user = await db.User.create(data);
    return user;
  } catch (error) {
    return { error };
  }
};
export default createUserQuery;
