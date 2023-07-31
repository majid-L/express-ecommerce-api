import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/prisma';
import createError from '../helpers/createError';

const requestBodyIsInvalid = (requestBody: { [key: string]: unknown }, url: string) => {
  return !Array.isArray(requestBody) 
    || requestBody.some(({ customerId, productId, ...item }) => {
      if (url.includes('wishlist')) return !customerId || !productId;
      return !customerId || !productId || (!item.quantity && item.quantity !== 0);
    });
}

const hasDuplicateItems = (requestBody: CartItem[] | WishlistItem[]) => {
  return requestBody.map(({ productId }) => productId)
  .some((productId, index, array) => array.indexOf(productId) !== index);
}

const validateUpdatedCartOrWishlist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (Array.isArray(req.body) && req.body.length === 0) return next();

    if (requestBodyIsInvalid(req.body, req.originalUrl)) {
      return next(createError('Invalid request body format.', 400));
    }

    if (hasDuplicateItems(req.body)) {
      return next(createError('Cart/wishlist items must be unique.', 400));
    }

    for (const item of (req.body as CartItem[] | WishlistItem[])) {
      const { customerId, productId } = item;
      const productFromDatabase = await prisma.product.findUnique({ 
        where: { id: productId } 
      });

      if (!productFromDatabase) {
        return next(createError(`Product with id ${item.productId} does not exist.`, 404));
      }

      if (customerId !== req.customerDetails.id) {
        return next(createError('Invalid customer id on cart/wishlist item.', 400));
      }

      if (req.originalUrl.includes('cart')) {
        if ((item as CartItem).quantity < 1) {
          return next(createError('Quantity must be at least 1.', 400));
        }

        if ((item as CartItem).quantity > productFromDatabase.stock) {
          return next(createError('Insufficient stock.', 400));
        }
      }
    }
    next();
  } catch(err) {
    next(err);
  }
}

export default validateUpdatedCartOrWishlist;