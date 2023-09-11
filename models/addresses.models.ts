import { Prisma } from '@prisma/client';
import prisma from '../prisma/prisma';

export const selectModelsWithAddress = async (addressId: number) => {
  const options = {
    where: { 
      OR: [
        { billingAddressId: addressId },
        { shippingAddressId: addressId },
      ]
    }
  };

  const resultOrNull = await prisma.$transaction([
    prisma.customer.findMany(options),
    prisma.order.findMany(options)
  ]); 

  return resultOrNull;
}

export const deleteUnusedAddress = async (addressId: number, customer: Prisma.CustomerGetPayload<{}>) => {
  if (customer.billingAddressId === customer.shippingAddressId) return null;
  const [ customers, orders ] = await selectModelsWithAddress(addressId);
  const noCustomers = (customers.length === 1 && customers[0].id === customer.id)
    || customers.length === 0;
    
  if (noCustomers && orders.length === 0) {
    const deletedAddress = await prisma.address.delete({
      where: { id: addressId }
    });
    return deletedAddress;
  }
  return null;
}