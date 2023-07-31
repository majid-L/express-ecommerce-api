type ItemType = CartItem | WishlistItem;

const stringstoNums = (obj: CartItem) => {
  for (const key in obj) {
    obj[key as keyof ItemType] = Number(obj[key as keyof ItemType]);
  }
  return obj;
}

const formatCartOrWishlist = (
  items: { [key: string]: number }[],
  modelType: 'cartItem' | 'wishlistItem'
): ItemType[] => {
  if (modelType === 'cartItem') {
    return (items)
    .map(({ customerId, productId, quantity }) => {
      return stringstoNums({ customerId, productId, quantity });
    });
  }
  
  return items.map(({ customerId, productId }) => {
    return { customerId, productId };
  });
}

export default formatCartOrWishlist;