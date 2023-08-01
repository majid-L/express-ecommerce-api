import { Router } from "express";
import { createOrder, getOrderById, getOrders } from "../controllers/orders.controllers";
import { searchOrderHistory } from "../controllers/orders.controllers";
import { 
    validateAddressTypes, 
    validateAddressFields, 
    validateAddressFieldValues,
    getOrCreateAddresses,
    validateSingleOrderItem
} from "../middleware/validateNewOrder";

const ordersRouter = Router();

ordersRouter
.route('/')
.get(
    getOrders,
    searchOrderHistory
)
.post(
    validateAddressTypes, 
    validateAddressFields,
    validateAddressFieldValues,
    getOrCreateAddresses,
    validateSingleOrderItem,
    createOrder
);

ordersRouter
.route('/:orderId')
.get(getOrderById);

export default ordersRouter;