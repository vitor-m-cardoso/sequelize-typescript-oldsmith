import { Router } from 'express';
import productsController from '../controllers/products.controller';
import { validateName, validatePrice, validateUserId } from '../middlewares/products.middleware';

const productsMiddlewareArr = [validateName, validatePrice, validateUserId];

const router = Router();

router.get('/', productsController.listProducts);
router.use(productsMiddlewareArr);
router.post('/', productsController.createProduct);

export default router;