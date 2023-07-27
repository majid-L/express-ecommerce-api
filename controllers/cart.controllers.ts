import { Request, Response, NextFunction } from 'express';
import { emptyCart, insertCartItems, selectCartItems, selectCustomerCartItems } from '../models/cart.models';

export const getCartItems = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cartItems = req.query.format === 'basic' ? 
      await selectCartItems(req.customerDetails.id)
      : await selectCustomerCartItems(req.customerDetails.id);

    res.status(200).send(cartItems);
  } catch (err) {
    next(err);
  }
}

export const modifyCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await emptyCart(req.customerDetails.id);
    if (req.body.length > 0) {
      await insertCartItems(req.body);
      const updatedCartItems = await selectCartItems(req.customerDetails.id);
      res.status(200).send({updatedCartItems});
    } else {
      res.status(200).send({updatedCartItems: []});
    }
  } catch(err) {
    next(err);
  }
}
