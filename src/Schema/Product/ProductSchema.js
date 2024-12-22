import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, "Product name is required"],
        unique: true,
    },
    productPrice: {
        type: Number,
        required: [true, "Product price is required"],
    },
    quantity: {
        type: Number,
        required: [true, "Product quantity is required"],
        default: 10,
    },
    productDescription: {
        type: String,
        required: [true, "Product description is required"],
    },
    inStock: {
        type: Boolean,
        default: true,
    },
    productImage: {
        type: String
    },
    productCategory: {
        type: String,
        enum : ['veg', 'non-veg', 'beverages', 'desserts'],
        default: 'veg',
        required: [true, "Product category is required"],
    },
},{
    timestamps: true,
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;