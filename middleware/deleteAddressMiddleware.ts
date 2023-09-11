import { Request, Response, NextFunction } from 'express';
import createError from '../helpers/createError';

export const identityQueryIsValid = (req: Request, res: Response, next: NextFunction) => {
  const query = req.query.identity;
  if (!query) {
    next(createError('To delete an address, you must specify the type of address by including an identity query in the request URL.', 400));
  } else if (query !== "billingAddressId" && query !== "shippingAddressId") {
    next(createError('Identity query must equal shippingAddressId or billingAddressId.', 400));
  } else {
    next();
  }
}

export const addressIsRegisteredToCustomer = (req: Request, res: Response, next: NextFunction) => {
  const { billingAddressId, shippingAddressId } = req.customerDetails;
  const addressId = Number(req.params.addressId);
  if (billingAddressId !== addressId && shippingAddressId !== addressId) {
    next(createError('Address not found on your account.', 404));
  } else {
    next();
  }
}