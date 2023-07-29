import { Router } from "express";
import { createOrder, getOrderById, getOrders } from "../controllers/orders.controllers";
import { 
    validateAddressTypes, 
    validateAddressFields, 
    validateAddressFieldValues,
    getOrCreateAddresses
} from "../middleware/validateNewOrder";

const ordersRouter = Router();

ordersRouter
.route('/')
.get(getOrders)
.post(
    validateAddressTypes, 
    validateAddressFields,
    validateAddressFieldValues,
    getOrCreateAddresses,
    createOrder
);

ordersRouter
.route('/:orderId')
.get(getOrderById);

export default ordersRouter;