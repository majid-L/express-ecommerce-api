import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/prisma';

export const getCartItems = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cartItems = await prisma.customer.findUnique({
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
    });
    res.status(200).send(cartItems);
  } catch (err) {
    next(err);
  }
}

export const addItemToCart = () => {}
export const modifyCartItemQuantity = () => {}
export const removeItemFromCart = () => {}

