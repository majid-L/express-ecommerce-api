import { Request } from 'express';
import prisma from '../prisma/prisma';

export const updateCustomer = async (
  data: number | null, // this is either an address id or NULL
  req: Request, 
  addressIdType: string) => {
  
  const user = await prisma.customer.update({
    where: { id: req.customerDetails.id },
    data: { [addressIdType]: data },
    include: {
      billingAddress: {},
      shippingAddress: {}
    }
  });

  return user;
}