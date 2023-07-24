import express from 'express';
import { userIsAuthenticated } from './middleware/validateAuth';
import cors from 'cors';
import handleError from './middleware/errors';
import apiRouter from './routers/apiRouter';
import passportConfig from './auth/passport';
import generateSession from './auth/session';

const app: express.Application = express();
app.use(cors());
app.use(express.json());

generateSession(app);
passportConfig(app);

app.use([
    '/api/customers/:customerId',
    '/api/logout'
], userIsAuthenticated);

app.use('/api', apiRouter);
app.use(handleError);

export default app;