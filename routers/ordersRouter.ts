import { Router } from "express";
import { createOrder, cancelOrder, getOrderById, getOrders, updateOrderStatus } from "../controllers/orders.controllers";
import { searchOrderHistory } from "../controllers/orders.controllers";
import orderIdParamHandler from "../middleware/orderIdParamHandler";
import { 
    validateAddressTypes, 
    validateAddressFields, 
    validateAddressFieldValues,
    getOrCreateAddresses,
    validateSingleOrderItem
} from "../middleware/validateNewOrder";

const ordersRouter = Router();
ordersRouter.param("orderId", orderIdParamHandler);

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
.get(getOrderById)
.put(updateOrderStatus)
.delete(cancelOrder);

export default ordersRouter;