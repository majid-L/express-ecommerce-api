import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/prisma';
import createError from '../helpers/createError';

// Validation middleware for signup
export const validateAuthInput = (req: Request, res: Response, next: NextFunction) => {
  const requiredFields = ['username', 'password', 'name', 'email'];

  for (const field of requiredFields) {
    if (!req.body[field]) {
      return next(createError('Request body is missing required field(s).', 400));
    }
  }

  for (const field of [...requiredFields, 'phone', 'avatar']) {
    if (req.body[field] && typeof req.body[field] !== 'string') {
      return next(createError('Request body fields must all be in string format.', 400));
    }
  }

  if (!/^[A-Za-z0-9_-]+$/.test(req.body.username)) {
    return next(createError('Username can only contain letters, numbers, dashes and underscores.', 400));
  }

  next();
}

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
    const msg = req.body.username === customerOrNull.username ? "That username is taken." : "Email already in use.";
    next(createError(msg, 400));
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