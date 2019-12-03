import statusCode from '../config/statusCode';
import { inputValidation, errorResponse } from '../helpers';

export default async (req, res, next) => {
  const { error } = inputValidation(req.body);
  if (error) {
    return errorResponse(
      res,
      statusCode.BAD_REQUEST,
      'Validation Error',
      error.details[0].message
    );
  }
  next();
};
