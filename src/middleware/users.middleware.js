import statusCode from '../config/statusCode';
import { findUser } from '../queries';
import { successResponse, errorResponse } from '../helpers';

export const checkUserExistMiddleware = async (req, res, next) => {
  const checkUser = await findUser(req.body.phone);
  checkUser
    ? successResponse(
        res,
        statusCode.EXIST,
        'Phone number already exists',
        null
      )
    : next();
};
