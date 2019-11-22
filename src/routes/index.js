import { Router } from 'express';
import users from './user.route';

const router = Router();

router.use('/auth', users);

export default router;
