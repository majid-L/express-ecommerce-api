import prisma from '../prisma/prisma';

export const selectCartOrWishlistItems = async (
  customerId: number, 
  queryFormat: string,
  tableName: 'cartItems' | 'wishlistItems',
  ) => {

  const select = tableName === 'cartItems' ? {
    quantity: true,
    product: {}
  } : { product: {} };

  if (queryFormat === 'basic') {
    return await prisma.cartItem.findMany({
      where: { customerId }
    });
  } else {
    return await prisma.customer.findUnique({
      where: { id: customerId },
      select: {
        id: true,
        name: true, 
        username: true,
        [tableName]: { select }
      }
    });
  }
}

export const insertCartOrWishlistItems = async (
   data: CartItem[],
   tableName: 'cartItem' | 'wishlistItem'
  ) => {
  if (tableName === 'cartItem') {
    await prisma.cartItem.createMany({ data } as { data: CartItem[] });
  } else {
    await prisma.wishlistItem.createMany({ data } as { data: WishlistItem[] });
  }
}

export const emptyCartOrWishlist = async (customerId: number) => {
  await prisma.cartItem.deleteMany({ 
    where: { customerId } 
  });
}