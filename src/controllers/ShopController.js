import { createShop, deleteShop, findAllShops } from '../queries';
import { successResponse, errorResponse } from '../helpers';
import statusCode from '../config/statusCode';
export default class ShopController {
  static async createNewShop(req, res) {
    const newShop = await createShop(req.body);
    newShop.error ||
    newShop.name === 'SequelizeValidationError' ||
    newShop.name === 'SequelizeUniqueConstraintError'
      ? errorResponse(
          res,
          statusCode.SERVER_ERROR,
          'Something went wrong, try again'
        )
      : successResponse(
          res,
          statusCode.CREATED,
          'You successfully created a shop',
          newShop
        );
  }
  static async deleteShop(req, res) {
    const { shopName } = req.params;
    const deleted = await deleteShop({ shopName });
    deleted.errors
      ? errorResponse(
          res,
          statusCode.SERVER_ERROR,
          'Something went wrong, please try again',
          null
        )
      : successResponse(res, statusCode.OK, 'Shop deleted successfully', null);
  }
  static async getAllShops(req, res) {
    const { owner } = req.body;
    const found = await findAllShops({ owner });
    found
      ? successResponse(res, statusCode.OK, 'Shops fetched successively', found)
      : errorResponse(
          res,
          statusCode.SERVER_ERROR,
          'Something went wrong, please try again',
          null
        );
  }
}
