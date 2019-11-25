import { Router } from 'express';
import { UserController } from '../controllers/';
import { checkUserExistMiddleware } from '../middleware/users.middleware';
import validation from '../middleware/validation.middleware';

const users = Router();

users.post(
  '/register',
  validation,
  checkUserExistMiddleware,
  UserController.createUser
);

export default users;
