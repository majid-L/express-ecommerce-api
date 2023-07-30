import { Request, Response, NextFunction } from 'express';
import { deleteUnusedAddress, selectAddressHolders } from '../models/addresses.models';
import { updateCustomer } from '../models/customer.models';
import prisma from '../prisma/prisma';

export const getOrCreateSingleAddress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { billingAddress, shippingAddress } = req.addresses;
    const addressIdType = billingAddress ? 'billingAddressId': 'shippingAddressId';
    const addressOrNull = await prisma.address.findFirst({ 
      where: billingAddress || shippingAddress 
    });
    
    if (addressOrNull) {
      const customer = await updateCustomer(addressOrNull.id, req, addressIdType);
      res.status(200).send(customer);
    } else {
      const newAddress = await prisma.address.create({ data: billingAddress || shippingAddress });
      const customer = await updateCustomer(newAddress.id, req, addressIdType);
      res.status(201).send({ newAddress, customer });
    }
    } catch (err) {
      next(err);
    }
}

export const deleteAddress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { billingAddressId } = req.customerDetails;
    const addressId = Number(req.params.addressId);
   
    const customersWithSameAddress = await selectAddressHolders(addressId);

    if (customersWithSameAddress.length > 1) {
      const addressIdType = billingAddressId === addressId ? 'billingAddressId' : 'shippingAddressId';
      const customer = await updateCustomer(null, req, addressIdType);
      return res.status(200).send(customer);
    }

    const deletedAddress = await deleteUnusedAddress(addressId);
    res.status(200).send({ deletedAddress });
  } catch (err) {
    next(err);
  }
}