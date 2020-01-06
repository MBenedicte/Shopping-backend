import { createShop } from '../queries';
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
}
