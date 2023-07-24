import { Router } from "express";
import { getCartItems, addItemToCart, modifyCartItemQuantity, removeItemFromCart } from "../controllers/cart.controllers";

const cartRouter = Router();

cartRouter
.route('/')
.get(getCartItems)
.post(addItemToCart);

cartRouter
.route('/:itemId')
.put(modifyCartItemQuantity)
.delete(removeItemFromCart)

export default cartRouter;