import { Router } from 'express';
import { getCustomerById, deleteAccount } from '../controllers/customer.controllers';
import validateUpdatedCustomer from '../middleware/validateUpdatedCustomer';
import cartRouter from './cartRouter';
import ordersRouter from './ordersRouter';

const customerRouter = Router();
customerRouter.use('/cart', cartRouter);
customerRouter.use('/orders', ordersRouter);

customerRouter
.route('/')
.get(getCustomerById)
.put(validateUpdatedCustomer, getCustomerById)
.delete(deleteAccount);

export default customerRouter;