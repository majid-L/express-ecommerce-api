import { Router } from "express";
import { 
    getCartOrWishlistItems,
     modifyCartOrWishlist
} from "../controllers/cart.controllers";
import validateUpdatedCartOrWishlist from "../middleware/validateCartWishlist";

const cartWishlistRouter = Router();

cartWishlistRouter
.route('/')
.get(getCartOrWishlistItems)
.put(validateUpdatedCartOrWishlist, modifyCartOrWishlist);

export default cartWishlistRouter;