import db from '../../models';

const createShop = async data => {
  try {
    return await db.Shop.create(data);
  } catch (error) {
    return error;
  }
};

export default createShop;

