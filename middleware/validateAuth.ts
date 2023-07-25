import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/prisma';

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
    const err: Error = new Error ('Username/email already in use.');
    (err as Error & { status: number }).status = 400;
    next(err);
  } else {
    next();
  }
}

// Protect routes from unauthenticated users
export const userIsAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  if (req.session.passport) {
    next();
  } else {
    res.status(401).json({msg: 'Request lacks valid authentication credentials for the requested resource.'});
  }
}