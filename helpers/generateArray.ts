import { Prisma } from "@prisma/client";

const generateArray = (cartItems: Prisma.CartItemGetPayload<{}>[], orderId: number) => {
  const orderItems: OrderItem[] = []; 
  cartItems.forEach(cartItem => {
    orderItems.push({
      orderId,
      productId: cartItem.productId,
      quantity: cartItem.quantity as number
    });
  });
  return orderItems;
}

export default generateArray;