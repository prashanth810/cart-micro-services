import mongoose, { Types } from 'mongoose';

const Cartschema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            weight: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
                min: 1,
            },
            original_price: {
                type: Number,
                required: true,
            },
            selling_price: {
                type: Number,
                required: true,
            },
        }
    ],
    total_ammount: {
        type: Number,
        default: 0,
    },

}, { timestamps: true, minimize: false });

const CartModel = mongoose.model("cart", Cartschema);
export default CartModel;