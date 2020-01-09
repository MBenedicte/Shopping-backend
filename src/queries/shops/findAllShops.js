import db from '../../models';

export default async data => {
  try {
    return await db.Shop.findAll({ where: data });
  } catch (err) {
    return { errors: err };
  }
};
