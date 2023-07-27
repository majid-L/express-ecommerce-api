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
    res.status(400).json({ msg: 'Username/email already in use.' });
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
    res.status(400).json({ msg: 'Request body is missing required field(s).' });
  } else {
    next();
  }
}

// Protect routes from unauthenticated users
export const userIsAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.passport) {
    res.status(401).json({ msg: 'Unauthenticated.' });
  } else {
    next();
  }
}

// Protect PUT/DELETE /api/reviews/:reviewId routes from unauthorised users
export const userIsAuthorised = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.passport!.user.id !== req.reviewDetails.customerId) {
    res.status(403).json({ msg: 'Unauthorised.' });
  } else {
    next();
  }
}