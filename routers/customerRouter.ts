import { Router } from 'express';
import { getCustomerById, deleteAccount } from '../controllers/customer.controllers';
import { getReviews } from '../controllers/reviews.controller';
import validateUpdatedModel from '../middleware/validateUpdatedModel';
import cartRouter from './cartRouter';
import ordersRouter from './ordersRouter';

const customerRouter = Router();
customerRouter.use('/cart', cartRouter);
customerRouter.use('/orders', ordersRouter);

customerRouter
.route('/')
.get(getCustomerById)
.put(validateUpdatedModel, getCustomerById)
.delete(deleteAccount);

customerRouter
.route('/reviews')
.get(getReviews);

export default customerRouter;