import { createUserQuery } from '../queries';
import { hash } from '../helpers';
import statusCode from '../config/statusCode';
import { successResponse, errorResponse } from '../helpers';
export default class UserController {
  static async createUser(req, res) {
    const { firstName, lastName, username, phone } = req.body;
    const newUser = { firstName, lastName, username, phone };
    req.body.password = hash(req.body.password);
    const created = await createUserQuery(req.body);

    created.error
      ? errorResponse(
          res,
          statusCode.SERVER_ERROR,
          'Something went wrong, please retry',
          created.error.errors[0].message
        )
      : successResponse(
          res,
          statusCode.CREATED,
          'You are successfully registered',
          newUser
        );
  }
}
