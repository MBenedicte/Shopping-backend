import { Router } from 'express';
import { UserController } from '../controllers/';
import { checkUserExistMiddleware } from "../middleware/users.middleware"


const users = Router();

users.post('/register',checkUserExistMiddleware, UserController.createUser);

export default users;
