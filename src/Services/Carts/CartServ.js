import { clearCartRepo, createCartRepo, getCartRepo } from "../../Repositories/Carts/CartsRepo.js";
import { findProductByIDServ } from "../Products/ProductServ.js";

async function getCartServ(userId){    
    const cart = getCartRepo(userId);
    if(!cart){
        throw { message : "Cart Not Found" , statusCode : 400};
    }
    return cart;
};

async function modifyCartServ(userId, productId, shouldAdd = true){
    let qunatityAdd = (shouldAdd == true) ? 1 : -1;
    console.log(qunatityAdd);

    let  cart = await getCartServ(userId);
    if(!cart){
        cart = await createCartRepo(userId);              
    }
    const product = await findProductByIDServ(productId);

    if(!product){
        throw {message : "Product is not found", statusCode : 400};
    }
    if(!product.inStock && product.quantity <= 0) {
        throw {message : "Product is out of stock", statusCode : 400};
    }

    // check whether the given product is exist in cart already or not

    let foundProduct = false;
    cart.items.forEach(item => {
        console.log(item);
        if(item.product._id == productId){
            if(shouldAdd){
                if(product.quantity >= item.quantity + 1) item.quantity += qunatityAdd;
                else{
                    throw new Error("Quantity exceeded the limit", {statusCode : 400});
                }
            }
            else{
                if(item.quantity > 0){
                    item.quantity = item.quantity + qunatityAdd; 
                    if(item.quantity == 0) {
                        cart.items = cart.items.filter(item => item.product._id != productId);
                        foundProduct = true;
                        return;
                    }
                }
                else{
                    throw new Error("No product is in the cart", { statusCode: 400 });
                }
            }

            foundProduct = true;
        }
    });

    console.log("isFound", foundProduct);
    // if product not alredy in the cart then add it to cart
    if(!foundProduct){
        if(shouldAdd){
            cart.items.push({
                product: productId,
                quantity: 1
            });
        }
        else{
            return null;
        }
    };

    await cart.save();
    return cart;
};

async function clearCartServ(userId){
    const response = await clearCartRepo(userId);
    return response;
};

export {getCartServ, modifyCartServ, clearCartServ };