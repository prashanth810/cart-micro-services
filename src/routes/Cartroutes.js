import express from "express";
import Authmiddleware from "../middlewares/Authmiddleware.js";
import { Addtocart, getproducts, removecart } from "../controllers/Cartcontroller.js";

const Cartroutes = express.Router();

// add products in cart
Cartroutes.post("/cart/addtocart", Authmiddleware, Addtocart);

// remove products in cart  
Cartroutes.post("/cart/remove", Authmiddleware, removecart);

// get product in cart 
Cartroutes.get('/cart/products', Authmiddleware, getproducts);


export default Cartroutes;