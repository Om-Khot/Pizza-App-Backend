import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    user : {
        ref: 'User',
        required: [true,"User should be provided"],
        type: mongoose.Schema.Types.ObjectId,
        unique: true // cart will be unique for each user
    },
    items : [
        {
            product : {
                ref: 'Product',
                required: [true,"Product should be provided"],
                type: mongoose.Schema.Types.ObjectId
            },
            quantity : {
                type: Number,
                required: [true,"Quantity should be provided"],
                default: 1
            }
        }
    ]
},{
    timestamps: true
});

const Cart = mongoose.model("Cart",CartSchema);

export default Cart;