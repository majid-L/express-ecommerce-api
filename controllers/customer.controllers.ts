import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/prisma';

export const getCustomerById = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send(req.customerDetails);
}

export const updateAccount = () => {}
export const deleteAccount = () => {}