import db from '../../models';

export default condition => {
  try {
    return db.User.findOne({ where: condition, logging: false });
  } catch (error) {
    return { error };
  }
};
