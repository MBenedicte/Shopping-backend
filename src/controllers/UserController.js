import Nexmo from 'nexmo';
import { createUserQuery, updateUser, findUser } from '../queries';
import { hash, createToken, verifyHashed, sendVerification } from '../helpers';
import statusCode from '../config/statusCode';
import { successResponse, errorResponse } from '../helpers';
import db from '../models';
import { isUserActive } from '../middleware/users.middleware';
export default class UserController {
  //User registration
  static async createUser(req, res) {
    const { firstName, lastName, username, phone } = req.body;
    const verificationNumber = sendVerification();
    const newUser = { firstName, lastName, username, phone };
    req.body.password = hash(req.body.password);
    const created = await createUserQuery({
      firstName,
      lastName,
      username,
      phone,
      password: req.body.password,
      verificationCode: verificationNumber
    });

    created.error || created.name === 'SequelizeValidationError'
      ? errorResponse(
          res,
          statusCode.SERVER_ERROR,
          'Something went wrong, please retry',
          created.error.errors[0].message
        )
      : successResponse(
          res,
          statusCode.CREATED,
          `You are successfully registered, You verification number is ${verificationNumber}. Please use the number to activate your account`,
          newUser
        );
  }

  // Activate the user account
  static async activateUser(req, res) {
    const { username } = req.params;
    const { verificationCode } = req.body;
    const user = await updateUser(
      { isVerified: true },
      { username, verificationCode }
    );

    if (user[0] === 0) {
      errorResponse(res, statusCode.NOT_FOUND, 'Such user does not exist');
    }
    successResponse(res, statusCode.OK, 'Your account has been activated');
  }

  //User Logging
  static async loginUser(req, res) {
    const { username, phone, password } = req.body;
    const user = await findUser({ username, phone });
    const correctPassword = verifyHashed(password, user.password);
    if (correctPassword) {
      const token = await createToken(phone, password);
      successResponse(res, statusCode.OK, 'Successfully logged in', {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        token
      });
    }
    errorResponse(res, statusCode.NOT_FOUND, 'Incorrect password');
  }
}
