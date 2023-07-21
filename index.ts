import express, { Express, Request, Response, NextFunction } from 'express';
import { handleError } from './middleware/errors';
import router from './router';
import localStrategy from './auth/localStrategy';
import passportConfig from './auth/passport';
import generateSession from './auth/session';

const app: express.Application = express();

app.use(express.json());

generateSession(app);
localStrategy();
passportConfig(app);

app.use(router);
app.use(handleError);

export default app;