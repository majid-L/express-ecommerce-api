import express from 'express';
import { userIsAuthenticated } from './middleware/validateAuth';
import cors from 'cors';
import handleError from './middleware/errors';
import apiRouter from './routers/apiRouter';
import passportConfig from './auth/passport';
import generateSession from './auth/session';
import _404Handler from './middleware/404Handler';
import validateRequestMethod from './middleware/validateRequestMethod';

const app: express.Application = express();
app.set('trust proxy', 1);
app.use(cors());
app.use(express.json());

generateSession(app);
passportConfig(app);

app.use(validateRequestMethod);
app.use('/api/customers/:customerId', userIsAuthenticated);

app.use('/api', apiRouter);
app.use(handleError);
app.use(_404Handler);

export default app;