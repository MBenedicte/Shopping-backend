import Nexmo from 'nexmo';
import { createUserQuery, updateUser, findUser } from '../queries';
import { hash, createToken, verifyHashed } from '../helpers';
import statusCode from '../config/statusCode';
import { successResponse, errorResponse } from '../helpers';
import db from '../models';
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
  static async sendVerification(req, res) {
    const nexmo = new Nexmo({
      apiKey: '694a8c0f',
      apiSecret: 'S4KL6cFvYQAXcdk4'
    });
    const text = Math.ceil(Math.random() * 10000);
    nexmo.message.sendSms(
      'Nexmo',
      req.body.phone,
      text,
      {
        type: 'unicode'
      },
      async (err, responseData) => {
        if (err) {
          errorResponse(
            res,
            statusCode.SERVER_ERROR,
            'Something went wrong, please retry'
          );
        } else {
          if (responseData.messages[0]['status'] === '0') {
            await updateUser(text, req.body.phone);

            successResponse(
              res,
              statusCode.OK,
              'Check a code from your phone ',
              {
                to: responseData.messages[0]['to'],
                'message-id': responseData.messages[0]['message-id'],
                code: text
              }
            );
          } else {
            errorResponse(
              res,
              statusCode.SERVER_ERROR,
              `Message failed with error: ${responseData.messages[0]['error-text']}`
            );
          }
        }
      }
    );
  }
  static async activateUser(req, res) {
    const { phone } = req.params;
    const { verificationCode } = req.body;
    const user = await db.User.update(
      { isVerified: true },
      { where: { phone, verificationCode } }
    );

    if (user[0] === 0) {
      errorResponse(res, statusCode.NOT_FOUND, 'Such user does not exist');
    }
    successResponse(res, statusCode.OK, 'Your account has been activated');
  }
  static async loginUser(req, res) {
    const { phone, password } = req.body;
    const user = await findUser({ phone });
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
