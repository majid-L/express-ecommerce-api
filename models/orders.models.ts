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

export const selectOrderById = async (id: number) => {
  return await prisma.order.findUnique({
    where: { id },
    include: {
      billingAddress: {},
      shippingAddress: {},
      orderItems: {
        select: {
          quantity: true,
          product: {}
        }
      }
    }
  });
}

export const insertOrder = async (
  customerDetails: Prisma.CustomerGetPayload<{}>,
  shippingAddressId: number,
  billingAddressId: number
  ) => {
  return await prisma.order.create({
    data: {
      customerId: customerDetails.id,
      shippingAddressId,
      billingAddressId,
      status: 'completed'
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