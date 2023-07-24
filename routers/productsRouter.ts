import { Router } from 'express';
import { getProducts, getProductById } from '../controllers/products.controllers';

const productRouter = Router();

productRouter.route('/').get(getProducts);
productRouter.route('/:productId').get(getProductById);

export default productRouter;