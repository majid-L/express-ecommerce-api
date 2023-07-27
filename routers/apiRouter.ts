import { Router } from 'express';
import passport from 'passport';
import { userIsAuthenticated, validateUniqueCredentials, validateAuthInput } from '../middleware/validateAuth';
import idParamHandler from '../middleware/idParamHandler';
import { signup, login, logout } from '../controllers/auth.controllers';
import productRouter from './productsRouter';
import customerRouter from './customerRouter';
import reviewsRouter from './reviewsRouter';
import getCategoriesOrSuppliers from '../controllers/categories.controllers';

const apiRouter = Router();
apiRouter.param('customerId', idParamHandler);

// Nested routers
apiRouter.use('/products', productRouter);
apiRouter.use('/reviews', reviewsRouter);
apiRouter.use('/customers/:customerId', customerRouter);

// Route controllers
apiRouter.get('/categories', getCategoriesOrSuppliers);
apiRouter.get('/suppliers', getCategoriesOrSuppliers);
apiRouter.post('/login', passport.authenticate('local'), login);
apiRouter.post('/logout', userIsAuthenticated, logout);
apiRouter.post('/signup', validateAuthInput, validateUniqueCredentials, signup);


export default apiRouter;