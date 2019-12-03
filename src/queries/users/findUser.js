import db from '../../models';

export default data => {
  try {
    return db.User.findOne({where: { phone: data}});
  } catch (error) {
    return { error };
  }
};
