import { Router } from 'express';
import { getCustomerById, deleteAccount } from '../controllers/customer.controllers';
import { getReviews } from '../controllers/reviews.controller';
import validateUpdatedModel from '../middleware/validateUpdatedModel';
import cartWishlistRouter from './cartWishlistRouter';
import ordersRouter from './ordersRouter';
import addressesRouter from './addressesRouter';
import { getFavorites } from '../controllers/products.controllers';

const customerRouter = Router();
customerRouter.use(['/cart', '/wishlist'], cartWishlistRouter);
customerRouter.use('/orders', ordersRouter);
customerRouter.use('/addresses', addressesRouter);

customerRouter
.route('/')
.get(getCustomerById)
.put(validateUpdatedModel, getCustomerById)
.delete(deleteAccount);

customerRouter
.route('/reviews')
.get(getReviews);

customerRouter
.route('/favorites')
.get(getFavorites);

export default customerRouter;