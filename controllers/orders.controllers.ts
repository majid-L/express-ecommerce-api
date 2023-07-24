import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/prisma';

export const getOrders = async (req: Request, res: Response) => {
  const orders = await prisma.customer.findUnique({
    where: { id: req.customerDetails.id },
    select: {
      id: true,
      name: true, 
      username: true,
      orders: {
        include: {
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
  res.send(orders)
}

export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
  const orderId = Number(req.params.orderId);
  const orderOrNull = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      orderItems: {
        select: {
          quantity: true,
          product: {}
        }
      }
    }
  });
  if (orderOrNull) {
    res.status(200).send(orderOrNull);
  } else {
    const err: Error = new Error ('Not found.');
    (err as Error & { status: number }).status = 404;
    next(err);
  }
}

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get all the items in the customer's cart
    const cartItems = await prisma.cartItem.findMany({
      where: { customerId: req.customerDetails.id }
    });

    if (cartItems.length === 0) {
      return res.status(400).send({ msg: "Unable to place order because cart is empty."});
    }

    // Create a new order that will be referenced by the order items below
    const newOrder = await prisma.order.create({
      data: {
        customerId: req.customerDetails.id,
        shippingAddress: req.customerDetails.shippingAddress,
        status: 'completed'
      }
    });

    // Generate an array of order items
    const orderItems: OrderItem[] = []; 
    cartItems.forEach(cartItem => {
      orderItems.push({
        orderId: newOrder.id,
        productId: cartItem.productId,
        quantity: cartItem.quantity as number
      });
    });

    // Now add all those order items to the order items table, completing the transaction
    await prisma.orderItem.createMany({ data: orderItems });

    // Subtract order quantities from product stock
    await prisma.$transaction(async () => {
      for (const item of orderItems) {
        await prisma.$executeRaw`
        UPDATE "Product" 
        SET stock = stock - ${item.quantity}
        WHERE id = ${item.productId}
        `;
      }
    });

    // Clear the cart
    await prisma.cartItem.deleteMany({ where: { customerId: req.customerDetails.id } });

    // Finally, return the new order
    const completedOrder = await prisma.order.findUnique({
      where: { id: newOrder.id },
      include: {
        orderItems: {
          select: {
            quantity: true,
            product: {}
          }
        }
      }
    });
    res.status(200).send(completedOrder);
  } catch (err) {
    next(err);
  }
}