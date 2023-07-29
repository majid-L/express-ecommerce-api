import { Router } from "express";
import { createOrder, getOrderById, getOrders } from "../controllers/orders.controllers";
import validateNewOrder from "../middleware/validateNewOrder";

const ordersRouter = Router();

ordersRouter
.route('/')
.get(getOrders)
.post(validateNewOrder, createOrder);

ordersRouter
.route('/:orderId')
.get(getOrderById);

export default ordersRouter;