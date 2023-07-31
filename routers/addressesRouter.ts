import { Router } from 'express';
import { addressIsRegisteredToCustomer } from '../middleware/deleteAddressMiddleware';
import { 
    validateAddressFields,
    validateAddressFieldValues, 
    validateAddressTypes 
} from '../middleware/validateNewOrder';
import { 
    deleteAddress, 
    getOrCreateSingleAddress 
} from '../controllers/addresses.controllers';

const addressesRouter = Router();

addressesRouter
.route('/')
.post(
    validateAddressTypes,
    validateAddressFields, 
    validateAddressFieldValues,
    getOrCreateSingleAddress
);

addressesRouter
.route('/:addressId')
.delete(
    addressIsRegisteredToCustomer,
    deleteAddress
);

export default addressesRouter