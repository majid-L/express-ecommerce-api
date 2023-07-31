import { Request, Response, NextFunction } from 'express';
import generateArray from '../helpers/generateArray';
import { insertOrder, selectOrderById, selectOrders, updateStockAmounts } from '../models/orders.models';
import { 
  emptyCartOrWishlist as emptyCart, 
  selectCartOrWishlistItems as selectCartItems 
} from '../models/cart.models';
import prisma from '../prisma/prisma';
import { Prisma } from '@prisma/client';
import createError from '../helpers/createError';

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
      return next(createError('Not found.', 404));
    }
  } catch (err) {
    next(err);
  }
}

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Create a new order that will be referenced by the order items below
    const newOrder = await insertOrder(
      req.customerDetails,
      (req.addresses.billingAddress as Prisma.AddressGetPayload<{}>).id,
      (req.addresses.shippingAddress as Prisma.AddressGetPayload<{}>).id
    );

    let orderItems = [] as OrderItem[];
    if (!req.body.item) {
      // Get all the items in the customer's cart
      const cartItems = await selectCartItems(req.customerDetails.id, 'basic', 'cartItems');
      if ((cartItems as CartItem[]).length === 0) {
        return next(createError('Unable to place order because cart is empty.', 400));
      }
      // Generate an array of order items
      orderItems = generateArray(cartItems as CartItem[], newOrder.id); 
    } else {
      orderItems = generateArray([req.body.item], newOrder.id);
    }

    // Now add all those order items to the order items table, completing the transaction
    if (orderItems.length === 1) {
      await prisma.orderItem.create({ data: orderItems[0] });
    } else {
      await prisma.orderItem.createMany({ data: orderItems });
    }

    // Subtract order quantities from product stock, clear the cart and return the new order
    await updateStockAmounts(orderItems);
    await emptyCart(req.customerDetails.id );
    const completedOrder = await selectOrderById(newOrder.id);
    res.status(201).send(completedOrder);
  } catch (err) {
    next(err);
  }
}