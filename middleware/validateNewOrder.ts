import { Request, Response, NextFunction } from 'express';
import createError from '../helpers/createError';

const validateNewOrder = (req: Request, res: Response, next: NextFunction) => {
  const shippingAddress = 
    req.customerDetails.shippingAddress 
    || 
    req.body.shippingAddress;

  if (!shippingAddress) {
    next(createError('Order must include a shipping address.', 400)); 
  } else {
    next();
  }
}

export default validateNewOrder;