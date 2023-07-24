import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/prisma';
import bcrypt from 'bcrypt';

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
    await prisma.customer.create({ data: {...req.body, password: hashedPassword} });
    const newCustomer = await prisma.customer.findUnique({
      where: { username: req.body.username }
    });
    res.status(201).send(newCustomer);
  } catch (err) {
    next(err);
  }
}

export const login = (req: Request, res: Response) => {
  const { name, username, email } = req.user as User;
  const customer = { name, username, email };
  res.send({customer});
}

export const logout = (req: Request, res: Response, next: NextFunction) => {
  const username = (req.user as User).username;
  req.logout(err => {
    if (err) return next(err);
    res.send({msg: username + ' is now logged out.'});
  });
}