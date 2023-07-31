import prisma from '../prisma/prisma';

const stockIsInsufficient = async (cartItem: CartItem) => {
  const products = await prisma.product.findMany({
    select: { id: true, stock: true }
  });

  const productFromDatabase = products.find(product => {
    return product.id === cartItem.productId;
  });
  
  return cartItem.quantity > productFromDatabase!.stock;
}

export default stockIsInsufficient;