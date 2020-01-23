import { Router } from 'express';
import { UserController } from '../controllers/';
import {
  // checkUserExistMiddleware,
  isUserActive,
  checkNumberExistMiddleware
} from '../middleware/users.middleware';
import validation from '../middleware/validation.middleware';
import user from '../helpers/factory/user';

const users = Router();

users.post(
  '/register',
  validation,
  checkNumberExistMiddleware,
  UserController.createUser
);

users.patch('/register/activate/:username', UserController.activateUser);
users.post('/login', isUserActive, UserController.loginUser);
users.patch(
  '/update/:username',
  checkUserExistMiddleware,
  UserController.editProfile
);
export default users;
