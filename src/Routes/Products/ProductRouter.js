import express from 'express';
import { createProduct, getProduct } from '../../Controllers/Products/ProductController.js';
import uploader from '../../Middlewares/multerMiddleware.js';
import { isAdmin, isLoggedIn } from '../../Validators/AuthValidation.js';

const ProductRouter = express.Router();

ProductRouter.post(
    '/create',
    isLoggedIn,
    isAdmin,
    uploader.single('pizzaImg'),
    createProduct
);

ProductRouter.get('/get',getProduct);

export default ProductRouter;