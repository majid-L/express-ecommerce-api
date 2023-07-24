import { Router } from 'express';
import { getCustomerById, updateAccount, deleteAccount } from '../controllers/customer.controllers';
import cartRouter from './cartRouter';
import ordersRouter from './ordersRouter';

const customerRouter = Router();
customerRouter.use('/cart', cartRouter);
customerRouter.use('/orders', ordersRouter);

customerRouter
.route('/')
.get(getCustomerById)
.put(updateAccount)
.delete(deleteAccount);

export default customerRouter;