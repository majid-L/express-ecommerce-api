import { Router } from 'express';
import { validateInput } from './middleware/validateInput';
import { checkIfCustomerExists } from './middleware/checkIfCustomerExists';
import { getCustomers, signup } from './controllers/app.controllers';

const router = Router();
router.get('/users', getCustomers);
router.post('/signup', validateInput, checkIfCustomerExists, signup);

export default router;