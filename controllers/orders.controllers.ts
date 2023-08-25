import { Request, Response, NextFunction } from 'express';
import generateArray from '../helpers/generateArray';
import { deleteOrder, insertOrder, selectOrderById, selectOrders, updateOrder, updateStockAmounts } from '../models/orders.models';
import { 
  emptyCartOrWishlist as emptyCart, 
  selectCartOrWishlistItems as selectCartItems 
} from '../models/cart.models';
import prisma from '../prisma/prisma';
import { Prisma } from '@prisma/client';
import createError from '../helpers/createError';
import { checkOrderHistory } from '../models/products.models';

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!isNaN(Number(req.query.productId))) return next();
    const orders = await selectOrders(req.customerDetails.id);
    res.status(200).send(orders)
  } catch (err) {
    next(err);
  }
}

export const searchOrderHistory = async (
  req: Request<{}, {}, {}, {productId: string}>, 
  res: Response,
  next: NextFunction
) => {
  const checkProductInOrders = await checkOrderHistory(
    Number(req.query.productId), 
    req.customerDetails.id
  );
  
  if (checkProductInOrders.notFound) {
    return next(createError(checkProductInOrders.notFound, 404));
  }
  res.status(200).send(checkProductInOrders);
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
      (req.addresses.shippingAddress as Prisma.AddressGetPayload<{}>).id,
      req.body.status || "completed",
      req.body.total,
      req.body.paymentMethod
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
    await emptyCart(req.customerDetails.id, 'cartItem');
    const completedOrder = await selectOrderById(newOrder.id);
    res.status(201).send(completedOrder);
  } catch (err) {
    next(err);
  }
}

export const updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body.status ? { status: req.body.status } : {};
    const order = await updateOrder(Number(req.params.orderId), data);
    return res.status(200).send(order);
  } catch (err) {
    next(err);
  }
}

export const cancelOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedOrder = await deleteOrder(req.orderDetails.id);
    res.status(200).send({ deletedOrder });
  } catch (err) {
    next(err);
  }
}