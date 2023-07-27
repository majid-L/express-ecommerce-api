import { Router } from "express";
import { createOrder, getOrderById, getOrders } from "../controllers/orders.controllers";

const ordersRouter = Router();

ordersRouter
.route('/')
.get(getOrders)
.post(createOrder);

ordersRouter
.route('/:orderId')
.get(getOrderById);

export default ordersRouter;