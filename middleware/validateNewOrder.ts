import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/prisma';
import createError from '../helpers/createError';

const requiredFields = ['addressLine1', 'city', 'postcode'];
const acceptedFields = [...requiredFields, 'addressLine2', 'county'];

export const validateAddressTypes = (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl.endsWith('addresses')) {
    if (!req.body.shippingAddress && !req.body.billingAddress) {
      next(createError('Request must include a billing or shipping address.', 400));
    } else {
      next();
    }
  } else if (!req.body.shippingAddress || !req.body.billingAddress) {
    next(createError('Request must include billing and shipping addresses.', 400));
  } else {
    next();
  }
}

export const validateAddressFields = (req: Request, res: Response, next: NextFunction) => {
  for (const address in req.body) {
    if (address === 'shippingAddress' || address === 'billingAddress') {
      const addressIsValid = requiredFields
        .every(requiredField => {
          return Object.keys(req.body[address]).includes(requiredField);
        });
      
      if (!addressIsValid) {
        return next(createError('Each address must contain at least `addressLine1`, `city` and `postcode`.', 400));
      }
    }
  }
  next();
}

export const validateAddressFieldValues = (
    req: Request<{}, {}, AddressGroup, {}>, 
    res: Response, 
    next: NextFunction
  ) => {
  const validAddresses = {} as AddressGroup;

  for (const address in req.body) {
    if (address === 'billingAddress' || address === 'shippingAddress') {
      validAddresses[address] = {} as Address;
      for (const addressField in req.body[address]) {
        const fieldValue = req.body[address][addressField as keyof Address];
        if (/^\s*$/.test(fieldValue as string)) {
          return next(createError('Field(s) cannot be empty or blank.', 400));
        }
        if (acceptedFields.includes(addressField)) {
          validAddresses[address][addressField as keyof Address] = 
            req.body[address][addressField as keyof Address] as string;
        }
      }
    }
  }
  req.addresses = validAddresses;
  next();
}

export const getOrCreateAddresses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { billingAddress, shippingAddress } = req.addresses;
    const resultSet = await prisma.$transaction([
      prisma.address.findFirst({ where: billingAddress }),
      prisma.address.findFirst({ where: shippingAddress }),
    ]);

    for (let i = 0; i < 2; i++) {
      const addressType = i === 0 ? 'billingAddress' : 'shippingAddress';
      if (resultSet[i]) {
        req.addresses[addressType] = resultSet[i] as Address;
      } else {
        const newAddress = await prisma.address.create({
          data: addressType === 'billingAddress' ? billingAddress : shippingAddress
        });
        req.addresses[addressType as keyof AddressGroup] = newAddress;
      }
    }
    next();
  } catch (err) {
    next(err);
  }
}