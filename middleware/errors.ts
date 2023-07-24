import { Request, Response, NextFunction } from 'express';

const handleError = (err: MiddlewareError, req: Request, res: Response, next: NextFunction) => {
  let msg = '';
  if (/(prisma|invocation|constraint)/i.test(err.message)) {
    msg = 'Invalid query.';
    err.status = 400;
  } else {
    msg = err.message;
  }
  res.status(err.status || 500).send({ msg });
}

export default handleError;