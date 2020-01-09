import db from '../../models';

export default async data => {
  try {
    return db.Shop.destroy({ where: data, logging: false });
  } catch (err) {
    return { errors: err };
  }
};
