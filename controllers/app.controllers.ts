import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/prisma';
import bcrypt from 'bcrypt';
import type { User } from '../types/types';

export const getCustomers = async (req: Request, res: Response) => {
  const customers = await prisma.customer.findMany();
  res.send(customers);
}

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  await prisma.customer.create({ data: {...req.body, password: hashedPassword} });
  const newCustomer = await prisma.customer.findUnique({
    where: { username: req.body.username }
  });
  res.send(newCustomer);
  next();
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { name, username, email } = req.user as User;
  const customer = { name, username, email };
  res.send({customer});
  next();
}

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  const username = (req.user as User).username;
  req.logout(err => {
    if (err) return next(err);
    res.send({msg: username + ' is now logged out.'});
  });
}

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  const products = await prisma.product.findMany();
}   