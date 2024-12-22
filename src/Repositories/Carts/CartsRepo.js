import Cart from "../../Schema/Cart/CartSchema.js";

async function createCartRepo(userId) {
    try{
        const newCart = await Cart.create({
            user: userId
        });
        return newCart;
    }
    catch(error){
        console.log(error);
        throw {message: "Internal Server Error", statusCode: 500};
    }
};

async function getCartRepo(userId) {
    console.log("repo hits",userId);
    try{
        const cart = await Cart.findOne({
            user: userId
        }).populate('items.product');
        console.log(cart);
        return cart;
    }
    catch(error){
        console.log(error);
        throw {message: "Internal Server Error repo", statusCode: 500};    
    }
};


async function clearCartRepo(userId) {
    try{
        const cart = await Cart.findOne({
            user: userId
        });
        if(!cart){
            throw {message : "Cart not found", statusCode: 400};
        }

        cart.items = [];
        await cart.save();
        return cart;
    }
    catch(error){
        // console.log(error);
        throw {message: "Internal Server Error", statusCode: 500};    
    }    
};

export {createCartRepo, getCartRepo, clearCartRepo};
