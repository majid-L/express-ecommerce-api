import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/prisma';
import createError from '../helpers/createError';

// Validation middleware for signup
export const validateUniqueCredentials = async (req: Request, res: Response, next: NextFunction) => {
  const customerOrNull = await prisma.customer.findFirst({
    where: { 
      OR: [
        { username: req.body.username },
        { email: req.body.email }
      ]
    }
  });
  
  if (customerOrNull) {
    next(createError('Username/email already in use.', 400));
  } else {
    next();
  }
}

// Validation middleware for signup
export const validateAuthInput = (req: Request, res: Response, next: NextFunction) => {
  const { name = null, username = null, password = null, email = null } = req.body;
  const requestFieldsAreInvalid = 
    req.url === '/signup' ?
      !name || !username || !password || !email
    : req.url === '/login' ?
      !username || !password
    : false;
  
  if (requestFieldsAreInvalid) {
    next(createError('Request body is missing required field(s).', 400));
  } else {
    next();
  }
}

// Protect routes from unauthenticated users
export const userIsAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.passport && !/\/customers\/\d+\/reviews.*$/i.test(req.originalUrl)) {
    next(createError('Unauthenticated.', 401));
  } else {
    next();
  }
}

// Protect PUT/DELETE /api/reviews/:reviewId routes from unauthorised users
export const userIsAuthorised = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.passport!.user.id !== req.reviewDetails.customerId) {
    next(createError('Unauthorised.', 403));
  } else {
    next();
  }
}