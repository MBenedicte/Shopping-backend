import statusCode from '../config/statusCode';
import { findUser } from '../queries';
import { successResponse, errorResponse } from '../helpers';

export const checkUserExistMiddleware = async (req, res, next) => {
  const checkUser = await findUser({ phone: req.body.phone });
  checkUser
    ? successResponse(
        res,
        statusCode.EXIST,
        'Phone number already exists',
        null
      )
    : next();
};
export const isUserActive = async (req, res, next) => {
  const { phone } = req.body;
  const checkUser = await findUser({ phone });

  if (!checkUser) {
    errorResponse(
      res,
      statusCode.NOT_FOUND,
      "User doesn't exist. Please register to continue"
    );
  }
  const isActive = await findUser({ phone, isVerified: true });
  isActive
    ? next()
    : errorResponse(
        res,
        statusCode.NOT_FOUND,
        'User is not active. Please activate your account'
      );
};
