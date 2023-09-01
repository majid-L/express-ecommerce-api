import { Router } from 'express';
import { getProducts, getProductById, updateProductStock } from '../controllers/products.controllers';
import { getReviews } from '../controllers/reviews.controller';
import idParamHandler from '../middleware/idParamHandler';
import { userIsAuthenticated } from '../middleware/validateAuth';
import { validateQueryParams } from '../middleware/validateQueryParams';

const productRouter = Router();
productRouter.param('productId', idParamHandler);

productRouter
.route('/')
.get(validateQueryParams, getProducts);

productRouter
.route('/:productId')
.get(getProductById)
.put(userIsAuthenticated, updateProductStock);

productRouter
.route('/:productId/reviews')
.get(getReviews);

export default productRouter;