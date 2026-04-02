import { getsingleproduct } from "../helperfunctions/Helperfunctions.js";
import CartModel from "../models/CartModel.js";


// add products in cart 
const Addtocart = async (req, res) => {
    try {
        const userId = req?.user?.id;
        const { productId, name, weight, quantity = 1 } = req?.body;

        if (!name) {
            return res.status(400).json({ success: false, message: "Product name is required!" });
        }
        if (!productId) {
            return res.status(400).json({ success: false, message: "Product ID is required!" });
        }
        if (!weight) {
            return res.status(400).json({ success: false, message: "Weight is required!" });
        }
        if (quantity < 1) {
            return res.status(400).json({ success: false, message: "Quantity must be at least 1!" });
        }

        const product = await getsingleproduct(productId);

        const productname = product.name;
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found!" });
        }

        // ✅ variants not variant
        const variant = product.variants.find(v => v.weight === weight);
        if (!variant) {
            return res.status(400).json({ success: false, message: `Weight ${weight} not available for this product!` });
        }

        if (variant.stock < quantity) {
            return res.status(400).json({ success: false, message: `Only ${variant.stock} items in stock for ${weight}!` });
        }

        // ✅ let not const
        let cart = await CartModel.findOne({ userId });

        if (!cart) {
            cart = new CartModel({ userId, items: [] });
        }

        const existingItem = cart.items.find(
            item => item.productId.toString() === productId && item.weight === weight
        );

        // ✅ if exists increase qty, else push new
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({
                name: productname,
                productId,
                weight,
                quantity,
                original_price: variant.original_price,
                selling_price: variant.selling_price,
            });
        }

        // ✅ total_amount not total_ammount
        cart.total_ammount = cart.items.reduce(
            (total, item) => total + item.selling_price * item.quantity, 0
        );

        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Product added to cart!",
            data: cart,
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// remove produsct from cart
const removecart = async (req, res) => {
    try {
        const { productId, weight } = req.body;

        const userId = req?.user?.id;

        if (!productId) {
            return res.status(400).json({ success: false, message: "Product ID is required!" });
        }
        if (!weight) {
            return res.status(400).json({ success: false, message: "Weight is required!" });
        }

        let cart = await CartModel.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart is not found !!!" });
        }

        const itemsexist = cart.items.find((item) => item.productId.toString() === productId && item.weight === weight);

        if (!itemsexist) {
            return res.status(404).json({ success: false, message: "Item not fund in cart !!!" });
        }

        itemsexist.quantity -= 1;

        if (itemsexist.quantity === 0) {
            cart.items = cart.items.filter((item) => !(item.productId.toString() === productId && item.weight === weight));
        }

        cart.total_ammount = cart.items.reduce((total, item) => total + item.selling_price * item.quantity, 0);

        await cart.save();

        return res.status(200).json({
            success: true,
            message: itemsexist.quantity === 0
                ? "Item removed from cart!"
                : `Quantity decreased! Remaining: ${itemsexist.quantity}`,
            data: cart,
        });

    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// get products in cart 
const getproducts = async (req, res) => {
    try {
        const userId = req?.user?.id;

        if (!userId) {
            return res.status(400).json({ success: false, message: "User id required!" });
        }

        const cart = await CartModel.findOne({ userId });

        // ✅ no [0] — findOne returns object directly
        if (!cart || cart.items.length === 0) {
            return res.status(200).json({ success: true, message: "Cart is empty!", total: 0, data: [] });
        }

        return res.status(200).json({
            success: true,
            total: cart.items.length,  // ✅ no [0]
            data: cart                 // ✅ no [0]
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export { Addtocart, getproducts, removecart };
