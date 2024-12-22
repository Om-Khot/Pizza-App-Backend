import express from 'express';
import { clearCartbyId, getCartByUserID, modifyCart } from '../../Controllers/Carts/CartController.js';
import { isLoggedIn } from '../../Validators/AuthValidation.js';

const CartRouter = express.Router();

CartRouter.post('/:operation/:productId', isLoggedIn, modifyCart);

CartRouter.get('/', isLoggedIn, getCartByUserID);

CartRouter.delete('/', isLoggedIn, clearCartbyId);


export default CartRouter;