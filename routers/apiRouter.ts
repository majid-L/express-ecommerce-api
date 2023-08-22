import { Router } from 'express';
import { Request, Response } from 'express';
import { userIsAuthenticated, validateUniqueCredentials, validateAuthInput } from '../middleware/validateAuth';
import idParamHandler from '../middleware/idParamHandler';
import { signup, login, logout } from '../controllers/auth.controllers';
import productRouter from './productsRouter';
import customerRouter from './customerRouter';
import reviewsRouter from './reviewsRouter';
import getCategoriesOrSuppliers from '../controllers/categories.controllers';
import endpoints from '../endpoints.json';
import passport from 'passport';
import { createPaymentIntent } from '../controllers/payment.controller';

const apiRouter = Router();
apiRouter.param('customerId', idParamHandler);

apiRouter.get('/', (req: Request, res: Response) => {
  res.status(200).send(endpoints);
});

apiRouter.post('/create-payment-intent', createPaymentIntent);

// Nested routers
apiRouter.use('/products', productRouter);
apiRouter.use('/reviews', reviewsRouter);
apiRouter.use('/customers/:customerId', customerRouter);

// Route controllers
apiRouter.get('/categories', getCategoriesOrSuppliers);
apiRouter.get('/suppliers', getCategoriesOrSuppliers);
apiRouter.post('/login', passport.authenticate('local', { failWithError: true }), login);

apiRouter.post('/logout', userIsAuthenticated, logout);
apiRouter.post('/signup', validateAuthInput, validateUniqueCredentials, signup);

export default apiRouter;