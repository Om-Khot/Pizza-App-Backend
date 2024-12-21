import cloudinary from "../../Config/cloudinaryConfig.js";
import { getProductByNameRepo, createProductRepo } from "../../Repositories/Products/ProductRepo.js";
import fs from 'fs/promises';
async function findProductService(productName) {
    // find product in database
    try {
        const product = await getProductByNameRepo(productName);
        return product;
    } catch (error) {
        console.log(error);
        throw {message: "Internal Server Error", statusCode: 500};       
    }    
};

async function createProductService(productDetails) {
    
    const imagePath = productDetails.productImage;

    // if product image is sent then upload to cloudinary and delete from server

    if(imagePath) {
        try {
            // upload image to cloudinary
            const result = await cloudinary.uploader.upload(imagePath);
            var productImg = result.secure_url;
            // delete image from server
            await fs.unlink(process.cwd() + '/' + imagePath);
        } catch (error) {
            console.log(error);
            throw {message: "Internal Server Error for img upload", statusCode: 500};
        }        
    }

    // check if product already exists or not
    try {
        const product = await findProductService(productDetails.productName);
        if(!product) {            
            const newProduct = await createProductRepo({
                ...productDetails,
                productImage : productImg
            });
            if(!newProduct) {
                throw {message: "Product not created on server", statusCode: 500};
            }
            return newProduct;            
        }
        else{
            return null;
        }
            
        
    } catch (error) {
        console.log(error);
        throw {message: "Internal Server Error 2", statusCode: 500};
    }

};

export { findProductService, createProductService };