import prisma from '../prisma/prisma';

export const selectAddressHolders = async (addressId: number) => {
  const customersWithSameAddress = await prisma.customer.findMany({
    where: { 
      OR: [
        { billingAddressId: addressId },
        { shippingAddressId: addressId },
      ]
    }
  });

  return customersWithSameAddress;
}

export const deleteUnusedAddress = async (addressId: number) => {
  const deletedAddress = await prisma.address.delete({
    where: { id: addressId }
  });

 return deletedAddress;
}