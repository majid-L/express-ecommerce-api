import { Request, Response, NextFunction } from 'express';
import createError from '../helpers/createError';
import prisma from '../prisma/prisma';

const validateUpdatedCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (Array.isArray(req.body) && req.body.length === 0) return next();
    if (!Array.isArray(req.body) 
    || req.body.some(item => {
      return !item.customerId || !item.productId || !item.quantity;
    })) {
      return next(createError('Invalid request body format.', 400));
    }

    const cartHasDuplicateItems = (req.body as CartItem[])
      .map(({ productId }) => productId)
      .some((productId, index, array) => array.indexOf(productId) !== index);
    if (cartHasDuplicateItems) {
      return next(createError('Cart items must be unique.', 400));
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
        return next(createError('Quantity must be at least 1.', 400));
      }
      if (!customerId || !productId || !quantity) {
        return next(createError('Request body is missing required field(s).', 400));
      }
      if (customerId !== req.customerDetails.id) {
        return next(createError('Invalid customer id on cart item.', 400));
      }
      const productFromDatabase = products.find(product => product.id === productId);
      if (quantity > productFromDatabase!.stock) {
        return next(createError('Insufficient stock.', 400));
      }
    }
    next();
  } catch(err) {
    next(err);
  }
}

export default validateUpdatedCart;