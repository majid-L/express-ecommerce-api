import { Request, Response, NextFunction } from 'express';
import { deleteUnusedAddress } from '../models/addresses.models';
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
      
      /* Delete old address if it is not referenced by another other customers or orders */ 
      const addressId = req.customerDetails[addressIdType];
      if (addressId) await deleteUnusedAddress(addressId, req.customerDetails);

      res.status(201).send({ newAddress, customer });
    }
    } catch (err) {
      next(err);
    }
}

export const deleteAddress = async (req: Request<{ addressId?: number }, {}, {}, { identity: AddressId }>, res: Response, next: NextFunction) => {
  try {
    const addressId = Number(req.params.addressId);

    /* Delete the unused address */
    const deletedAddress = await deleteUnusedAddress(addressId, req.customerDetails);
    if (deletedAddress) {
      return res.status(200).send({ deletedAddress });
    }
    
    /* Cannot delete primary key while it's being referenced by other orders/customers, 
    but we can set the foreign id to null in the customer table */
    const addressIdType = req.query.identity;
    const customer = await updateCustomer(null, req, addressIdType);
    res.status(200).send(customer);
  } catch (err) {
    next(err);
  }
}

/* *** Notes on deleteAddress controller ***
*****************************************************************************
> selectModelsWithAddress(addressId) has a return signature of
    [ orders, customers ]: [ Customer[], Order[] ] .
    It returns all orders and customers (if any) with a foreign key that
    reference the address, or [ [], [] ]
-----------------------------------------------------------------------------
> In the second half, we set the address id to null in the customer
    table but do not attempt to delete the address from the address
    table becasue it is still being referenced by other customers or orders.
*****************************************************************************
*/