import { Router } from 'express';
import { ShopController } from '../controllers';
import verifyToken from '../middleware/verifyToken.middleware';
import { checkUserExistMiddleware } from '../middleware/users.middleware';
import {
  checkShopNameExist,
  findShopNameExist
} from '../middleware/shops.middleware';

const shops = Router();

shops.post(
  '/create',
  verifyToken,
  checkUserExistMiddleware,
  checkShopNameExist,
  ShopController.createNewShop
);
shops.delete(
  '/delete/:shopName',
  verifyToken,
  findShopNameExist,
  ShopController.deleteShop
);
shops.get('/getShops/',checkUserExistMiddleware, ShopController.getAllShops);

export default shops;
