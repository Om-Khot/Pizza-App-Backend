import express from 'express';
import { createProduct, getProduct } from '../../Controllers/Products/ProductController.js';
import uploader from '../../Middlewares/multerMiddleware.js';

const ProductRouter = express.Router();

ProductRouter.post('/create',uploader.single('pizzaImg'), createProduct);
ProductRouter.get('/get',getProduct);

export default ProductRouter;