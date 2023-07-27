import { Router } from 'express';
import { getProducts, getProductById, getBestSellers } from '../controllers/products.controllers';
import { getReviews } from '../controllers/reviews.controller';
import idParamHandler from '../middleware/idParamHandler';

const productRouter = Router();
productRouter.param('productId', idParamHandler);

productRouter
.route('/')
.get(getProducts);

productRouter.
route('/bestsellers')
.get(getBestSellers);

productRouter
.route('/:productId')
.get(getProductById);

productRouter
.route('/:productId/reviews')
.get(getReviews);

export default productRouter;