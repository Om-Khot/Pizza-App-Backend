import { createProductService, findProductService } from "../../Services/Products/ProductServ.js";

async function createProduct(req, res) {
    try {
        const newProduct = await createProductService({
            productName: req.body.productName,
            productPrice: req.body.productPrice,
            productCategory: req.body.productCategory,
            productDescription: req.body.productDescription,
            productQuantity: req.body.productQuantity,
            productImage: req.file?.path
        });
        if(!newProduct) {
            return res.status(409).json({
                success: false,
                message: "Product already exists"
            });
        }
        res.status(201).json({
            success: true,
            message: "Product created",
            product: newProduct
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error 1",
            error: error
        });
    }
    
};

async function getProduct(req, res) {
    try {
        const product = await findProductService(req.body.productName);
        if(!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        res.status(200).json({
            message: "Product found",
            product: product
        });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode).json({
            message: error.message
        });
    }
};

export { createProduct, getProduct };