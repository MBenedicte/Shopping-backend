import db from '../../models';

export default condition => {
  try {
    return db.Shop.findOne({ where: condition, logging: false });
  } catch (error) {
    return { error };
  }
};
