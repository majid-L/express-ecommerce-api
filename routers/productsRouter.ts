import { Router } from 'express';
import { getProducts, getProductById, getBestSellers } from '../controllers/products.controllers';

const productRouter = Router();

productRouter.route('/').get(getProducts);
productRouter.route('/bestsellers').get(getBestSellers);
productRouter.route('/:productId').get(getProductById);

export default productRouter;