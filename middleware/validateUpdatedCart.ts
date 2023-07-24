import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/prisma';

const validateUpdatedCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.body.length === 0) return next();

    const err: MiddlewareError = new Error();
    err.status = 400;

    const cartHasDuplicateItems = (req.body as CartItem[])
      .map(({ productId }) => productId)
      .some((productId, index, array) => array.indexOf(productId) !== index);
  
    if (cartHasDuplicateItems) {
      err.message = 'Cart items must be unique.';
      return next(err);
    }

    const products = await prisma.product.findMany({
      select: {
        id: true,
        stock: true
      }
    });

    for (const cartItem of (req.body as CartItem[])) {
      const { customerId, productId, quantity } = cartItem;
      if (quantity < 1) {
        err.message = 'Quantity must be at least 1.';
        return next(err);
      }
      if (!customerId || !productId || !quantity) {
        err.message = 'Request body is missing required fields.';
        return next(err);
      }
      if (customerId !== req.customerDetails.id) {
        err.message = 'Invalid customer id on cart item.';
        return next(err);
      }
      const productFromDatabase = products.find(product => product.id === productId);
      if (quantity > productFromDatabase!.stock) {
        err.message = 'Insufficient stock.';
        return next(err);
      }
    }
    next();
  } catch(err) {
    next(err);
  }
}

export default validateUpdatedCart;