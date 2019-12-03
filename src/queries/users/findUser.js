import db from '../../models';

export default condition => {
  try {
    return db.User.findOne({where:condition});
  } catch (error) {
    return { error };
  }
};
