import prisma from '../prisma/prisma';

export const selectCustomerCartItems = async (customerId: number) => {
  return await prisma.customer.findUnique({
    where: { id: customerId },
    select: {
      id: true,
      name: true, username: true,
      cartItems: {
        select: {
          quantity: true,
          product: {}
        }
      }
    }
  });
}

export const selectCartItems = async (customerId: number) => {
  return await prisma.cartItem.findMany({
    where: { customerId }
  });
}

export const insertCartItems = async (data: CartItem[]) => {
  await prisma.cartItem.createMany({
    data
  } as { data: CartItem[] });
}

export const emptyCart = async (customerId: number) => {
  await prisma.cartItem.deleteMany({ 
    where: { customerId } 
  });
}