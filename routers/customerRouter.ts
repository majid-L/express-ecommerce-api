import { Router } from 'express';
import { deleteAddress, getOrCreateSingleAddress } from '../controllers/addresses.controllers';
import { getCustomerById, deleteAccount } from '../controllers/customer.controllers';
import { getReviews } from '../controllers/reviews.controller';
import { addressIsRegisteredToCustomer } from '../middleware/deleteAddressMiddleware';
import { validateAddressFields, validateAddressFieldValues, validateAddressTypes } from '../middleware/validateNewOrder';
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

customerRouter
.route('/addresses')
.post(
    validateAddressTypes,
    validateAddressFields, 
    validateAddressFieldValues,
    getOrCreateSingleAddress
);

customerRouter
.route('/addresses/:addressId')
.delete(
    addressIsRegisteredToCustomer,
    deleteAddress
);

export default customerRouter;