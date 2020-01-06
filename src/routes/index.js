import { Router } from 'express';
import users from './user.route';
import shops from './shop.route';

const router = Router();

router.use('/auth', users);
router.use('/shop', shops);

export default router;
