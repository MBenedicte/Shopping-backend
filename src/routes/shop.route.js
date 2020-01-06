import { Router } from 'express';
import { ShopController } from '../controllers';
import verifyToken from '../middleware/verifyToken.middleware';

const shops = Router();

shops.post('/create', verifyToken, ShopController.createNewShop);

export default shops;
