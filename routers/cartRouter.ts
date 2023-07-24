import { Router } from "express";
import { getCartItems, modifyCart } from "../controllers/cart.controllers";
import validateUpdatedCart from "../middleware/validateUpdatedCart";

const cartRouter = Router();

cartRouter
.route('/')
.get(getCartItems)
.put(validateUpdatedCart, modifyCart);

export default cartRouter;