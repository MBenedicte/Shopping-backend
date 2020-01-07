import db from '../../models';

export default condition => {
  try {
    return db.Shop.findOne({ where: condition });
  } catch (error) {
    return { error };
  }
};
