import { Router } from 'express';
import passport from 'passport';
import validateAuthInput from '../middleware/validateAuthInput';
import { validateUniqueCredentials } from '../middleware/validateAuth';
import customerIdParamHandler from '../middleware/customerIdParamHandler';
import { signup, login, logout } from '../controllers/auth.controllers';

import productRouter from './productsRouter';
import customerRouter from './customerRouter';

const apiRouter = Router();
apiRouter.param('customerId', customerIdParamHandler);

apiRouter.use('/products', productRouter);
apiRouter.use('/customers/:customerId', customerRouter);

apiRouter.post('/login', passport.authenticate('local'), login);
apiRouter.post('/logout', logout);
apiRouter.post('/signup', validateAuthInput, validateUniqueCredentials, signup);


export default apiRouter;