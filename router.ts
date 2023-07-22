import { Router } from 'express';
import passport from 'passport';
import { validateAuthInput } from './middleware/validateAuthInput';
import { validateUniqueCredentials } from './middleware/validateAuth';
import { getCustomers, signup, login, logout } from './controllers/app.controllers';

const router = Router();

// products
router.get('/products', /*...*/);

// single product
router.get('/products/:productId', /*...*/);

// account details
router.get('/customers/:customerId', getCustomers);
router.put('/customers/:customerId', /*...*/);
router.delete('/customers/:customerId', /*...*/);

// cart items
router.get('/customers/:customerId/cart', /*...*/);
router.post('/customers/:customerId/cart', /*...*/);
router.put('/customers/:customerId/cart/:itemId', /*...*/);
router.delete('/customers/:customerId/cart/:itemId', /*...*/);

// orders
router.get('/customers/:customerId/orders', /*...*/);
router.post('/customers/:customerId/orders', /*...*/);

// single order
router.get('/customers/:customerId/orders/:orderId', /*...*/);

router.post('/login', passport.authenticate('local'), login);
router.post('/logout', logout);
router.post('/signup', validateAuthInput, validateUniqueCredentials, signup);

export default router;