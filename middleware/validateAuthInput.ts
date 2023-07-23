import { Request, Response, NextFunction } from 'express';

const validateAuthInput = (req: Request, res: Response, next: NextFunction) => {
  const { name = null, username = null, password = null, email = null } = req.body;
  const requestFieldsAreInvalid = 
    req.url === '/signup' ?
      !name || !username || !password || !email
    : req.url === '/login' ?
      !username || !password
    : false;
  
    if (requestFieldsAreInvalid) {
    const err: Error = new Error ('Request body is missing required fields.');
    (err as Error & { status: number }).status = 400;
    next(err);
  } else {
    next();
  }
}

export default validateAuthInput;