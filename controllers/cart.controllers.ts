import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/prisma';

export const getCartItems = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cartItems = req.query.format !== 'basic' ? await prisma.customer.findUnique({
      where: { id: req.customerDetails.id },
      select: {
        id: true,
        name: true, username: true,
        cartItems: {
          select: {
            quantity: true,
            product: {}
          }
        }
      }
    })
    : await prisma.cartItem.findMany({
      where: { customerId: req.customerDetails.id }
    });

    res.status(200).send(cartItems);
  } catch (err) {
    next(err);
  }
}

export const modifyCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await prisma.cartItem.deleteMany({
      where: { customerId: req.customerDetails.id }
    });
  
    if (req.body.length > 0) {
      await prisma.cartItem.createMany({
        data: req.body
      } as { data: CartItem[] });

      const updatedCartItems = await prisma.cartItem.findMany({
        where: { customerId: req.customerDetails.id }
      });
    
      res.status(200).send({updatedCartItems});
    } else {
      res.status(200).send({updatedCartItems: []});
    }
  } catch(err) {
    next(err);
  }
}

