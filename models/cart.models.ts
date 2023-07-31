import formatCartOrWishlist from '../helpers/formatWishlist';
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

  const where = { where: { customerId } };

  if (queryFormat === 'basic') {
    return tableName === 'cartItems' ? 
      await prisma.cartItem.findMany(where)
      : await prisma.wishlistItem.findMany(where);
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
  requestBody: { [key: string]: number }[],
  tableName: 'cartItem' | 'wishlistItem'
) => {
  if (tableName === 'cartItem') {
    const data = formatCartOrWishlist(requestBody, 'cartItem');
    await prisma.cartItem.createMany({ data } as { data: CartItem[] });
  } else {
    const data = formatCartOrWishlist(requestBody, 'wishlistItem');
    await prisma.wishlistItem.createMany({ data } as { data: WishlistItem[] });
  }
}

export const emptyCartOrWishlist = async (
  customerId: number,
  tableName: 'cartItem' | 'wishlistItem'
) => {
  const where = { where: { customerId } };
  
  tableName === 'cartItem' ? 
    await prisma.cartItem.deleteMany(where)
    : await prisma.wishlistItem.deleteMany(where);
}