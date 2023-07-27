import { Request, Response, NextFunction } from 'express';
import generateArray from '../helpers/generateArray';
import { insertOrder, selectOrderById, selectOrders, updateStockAmounts } from '../models/orders.models';
import { emptyCart, selectCartItems } from '../models/cart.models';
import prisma from '../prisma/prisma';

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await selectOrders(req.customerDetails.id);
    res.status(200).send(orders)
  } catch (err) {
    next(err);
  }
}

export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderOrNull = await selectOrderById(Number(req.params.orderId));
    if (orderOrNull) {
      res.status(200).send(orderOrNull);
    } else {
      res.status(404).send('Not found.');
    }
  } catch (err) {
    next(err);
  }
}

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get all the items in the customer's cart
    const cartItems = await selectCartItems(req.customerDetails.id);
    if (cartItems.length === 0) {
      return res.status(400).send({ msg: "Unable to place order because cart is empty."});
    }

    // Create a new order that will be referenced by the order items below
    const newOrder = await insertOrder(req.customerDetails);

    // Generate an array of order items
    const orderItems: OrderItem[] = generateArray(cartItems, newOrder.id); 

    // Now add all those order items to the order items table, completing the transaction
    await prisma.orderItem.createMany({ data: orderItems });

    // Subtract order quantities from product stock
    await updateStockAmounts(orderItems);

    // Clear the cart
    await emptyCart(req.customerDetails.id );

    // Finally, return the new order
    const completedOrder = await selectOrderById(newOrder.id);
    res.status(201).send(completedOrder);
  } catch (err) {
    next(err);
  }
}