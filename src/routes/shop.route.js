import { Router } from 'express';
import { ShopController } from '../controllers';
import verifyToken from '../middleware/verifyToken.middleware';
import { checkUserExistMiddleware } from '../middleware/users.middleware';
import { checkShopNameExist } from '../middleware/shops.middleware';

const shops = Router();

shops.post(
  '/create',
  verifyToken,
  checkUserExistMiddleware,
  checkShopNameExist,
  ShopController.createNewShop
);

export default shops;
