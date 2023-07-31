import { Request, Response, NextFunction } from 'express';
import stockIsInsufficient from '../helpers/checkProductStock';
import createError from '../helpers/createError';

const requestBodyIsInvalid = (requestBody: { [key: string]: unknown }, url: string) => {
  return !Array.isArray(requestBody) 
    || requestBody.some(({ customerId, productId, ...item }) => {
      if (url.includes('wishlist')) return !customerId || !productId;
      return !customerId || !productId || !item.quantity;
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
      if ((item as CartItem).quantity < 1) {
        return next(createError('Quantity must be at least 1.', 400));
      }
      if (!customerId || !productId || 
        (req.originalUrl.includes('cart') && !(item as CartItem).quantity)) {
        return next(createError('Request body is missing required field(s).', 400));
      }
      if (customerId !== req.customerDetails.id) {
        return next(createError('Invalid customer id on cart/wishlist item.', 400));
      }
      if (await stockIsInsufficient(item as CartItem)) {
        return next(createError('Insufficient stock.', 400));
      }
    }
    next();
  } catch(err) {
    next(err);
  }
}

export default validateUpdatedCartOrWishlist;