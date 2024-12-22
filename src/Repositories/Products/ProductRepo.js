import Product from "../../Schema/Product/ProductSchema.js";

async function createProductRepo(productDetails) {
    // create new product in database
    try {
        const newProduct = await Product.create(productDetails);
        return newProduct;
    } catch (error) {
        console.log(error);
        throw {message: "Internal Server Error", statusCode: 500};
    }
};

async function getProductByNameRepo(productName) {
    // find product in database
    try {
        const product = await Product.findOne({productName  : productName});
        if(!product) {
            return null;
        }
        return product;
    }
    catch (error) {
        console.log(error);
        throw {message: "Internal Server Error", statusCode: 500};
    }
};

async function getProductByIDRepo(productId) {
    // find product in database
    try {
        const product = await Product.findById(productId);
        if(!product) {
            return null;
        }
        return product;
    }
    catch (error) {
        console.log(error);
        throw {message: "Internal Server Error", statusCode: 500};
    }
};

export { createProductRepo, getProductByNameRepo , getProductByIDRepo};