import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/prisma';

export const getCustomerById = (req: Request, res: Response) => {
  req.customerDetails.password = '**********';
  res.status(200).send(req.customerDetails);
}

export const deleteAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedUser = await prisma.customer.delete({
      where: { id: req.customerDetails.id }
    });
    req.logout((err: Error) => {
      if (err) return next(err);
      res.status(200).send({ 
        msg: `User ${deletedUser.username} has been deleted.`,
        deletedUser: {
          id: deletedUser.id,
          name: deletedUser.name,
          username: deletedUser.username,
          email: deletedUser.email
        }
      });
    });
  } catch (err) {
    next(err);
  }
}