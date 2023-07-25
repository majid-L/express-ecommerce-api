import { Router } from 'express';
import passport from 'passport';
import validateAuthInput from '../middleware/validateAuthInput';
import { validateUniqueCredentials } from '../middleware/validateAuth';
import customerIdParamHandler from '../middleware/customerIdParamHandler';
import { signup, login, logout } from '../controllers/auth.controllers';
import productRouter from './productsRouter';
import customerRouter from './customerRouter';
import getCategoriesOrSuppliers from '../controllers/categories.controllers';

const apiRouter = Router();
apiRouter.param('customerId', customerIdParamHandler);

// Nested routers
apiRouter.use('/products', productRouter);
apiRouter.use('/customers/:customerId', customerRouter);

// Route controllers
apiRouter.get('/categories', getCategoriesOrSuppliers);
apiRouter.get('/suppliers', getCategoriesOrSuppliers);
apiRouter.post('/login', passport.authenticate('local'), login);
apiRouter.post('/logout', logout);
apiRouter.post('/signup', validateAuthInput, validateUniqueCredentials, signup);


export default apiRouter;