import { clearCartServ, getCartServ, modifyCartServ } from "../../Services/Carts/CartServ.js";

async function getCartByUserID(req,res){
    console.log("controller hits")
    console.log(req.user);
    try {
        const cart = await getCartServ(req.user.id);
        if(!cart){
            return res.status(400).json({
                success: false,
                message: "Cart not fetched",
                data: {}
            });
        }
        return res.status(200).json({
            success: true,
            message: "Cart successfully fetched",
            data: cart,
            error: {}
        });
    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            message: "Internal Server Error from controller",
            // error: error
        });
    }
};

async function modifyCart(req,res){
    console.log("Controller hits")
    console.log(req.user , req.params);
    try{
        const newCart = await modifyCartServ(req.user.id, req.params.productId, req.params.operation == 'add');
        console.log("newCart", newCart);
        if(!newCart){
            return res.status(400).json({
                success: false,
                message: "Cart not fetched",
                data: {},
                // error: error
            });
        }
        return res.status(201).json({
            success : true,
            message: "Succefully added the product to cart",
            error: {},
            data: newCart
        });
    }
    catch(error){
        if(error){
            return res.status(400).json({
                message : "Cant add above 10"
            });
        }
        
        return res.status(500).json({
            message: "Internal Server Error",
        }); 
    }
};

async function clearCartbyId(req,res){
    try{
        const response = await clearCartServ(req.user.id);
        return res.status(200).json({
            success : true,
            message : "Successfully deleted the cart"
        });
    } 
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
            data: {}
        });
    }
};

export {getCartByUserID, modifyCart , clearCartbyId}



