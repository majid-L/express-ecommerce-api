import prisma from '../prisma/prisma';
import { Prisma } from '@prisma/client';

export const selectOrders = async (id: number) => {
  return await prisma.customer.findUnique({
    where: { id },
    select: {
      id: true,
      name: true, 
      username: true,
      orders: {
        include: {
          shippingAddress: {},
          orderItems: {
            select: {
              quantity: true,
              product: {}
            }
          }
        }
      }
    }
  });
}

const include = {
  billingAddress: {},
  shippingAddress: {},
  orderItems: {
    select: {
      quantity: true,
      product: {}
    }
  }
}

export const selectOrderById = async (id: number) => {
  return await prisma.order.findUnique({
    where: { id },
    include
  });
}

export const updateOrder = async (id: number, data: { status?: string }) => {
  return await prisma.order.update({
    where: { id },
    data,
    include
  });
}

export const deleteOrder = async (id: number) => {
  return await prisma.order.delete({
    where: { id },
    include
  });
}

export const insertOrder = async (
  customerDetails: Prisma.CustomerGetPayload<{}>,
  billingAddressId: number,
  shippingAddressId: number,
  status: string
  ) => {
  return await prisma.order.create({
    data: {
      customerId: customerDetails.id,
      billingAddressId,
      shippingAddressId,
      status
    }
  });
}

export const updateStockAmounts = async (orderItems: OrderItem[]) => {
  await prisma.$transaction(async () => {
    for (const item of orderItems) {
      await prisma.$executeRaw`
        UPDATE "Product" 
        SET stock = stock - ${item.quantity}
        WHERE id = ${item.productId}
      `;
    }
  });
}