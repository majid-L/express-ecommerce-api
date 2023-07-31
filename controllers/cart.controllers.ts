import { Request, Response, NextFunction } from 'express';
import { 
  emptyCartOrWishlist, 
  insertCartOrWishlistItems, 
  selectCartOrWishlistItems 
} from '../models/cart.models';

export const getCartOrWishlistItems = async (
  req: Request, 
  res: Response, 
  next: NextFunction) => {
  try {
    const modelType = req.originalUrl.includes('cart') ? 'cartItems' : 'wishlistItems';
    const items = await selectCartOrWishlistItems(
      req.customerDetails.id,
      req.query.format as string,
      modelType
    );

    res.status(200).send({ [modelType.slice(0, -5)]: items});
  } catch (err) {
    console.log(err)
    next(err);
  }
}

export const modifyCartOrWishlist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const modelType = req.originalUrl.includes('cart') ? 'cartItem' : 'wishlistItem';
    await emptyCartOrWishlist(req.customerDetails.id);
    if (req.body.length > 0) {
      await insertCartOrWishlistItems(req.body, modelType);
      const updatedItems = 
        await selectCartOrWishlistItems(
          req.customerDetails.id, 
          req.query.format as string, 
          modelType + 's' as 'cartItems' | 'wishlistItems'
        );
      res.status(200).send({ [modelType.slice(0, -4)] : updatedItems });
    } else {
      res.status(200).send({ [modelType.slice(0, -4)]: []});
    }
  } catch(err) {
    next(err);
  }
}
