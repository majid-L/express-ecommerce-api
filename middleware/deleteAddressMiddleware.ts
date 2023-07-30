import { Request, Response, NextFunction } from 'express';
import createError from '../helpers/createError';

export const addressIsRegisteredToCustomer = (req: Request, res: Response, next: NextFunction) => {
  const { billingAddressId, shippingAddressId } = req.customerDetails;
  const addressId = Number(req.params.addressId);
  if (billingAddressId !== addressId && shippingAddressId !== addressId) {
    next(createError('Address not found on your account.', 404));
  } else {
    next();
  }
}