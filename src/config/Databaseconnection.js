import mongoose from "mongoose";
import ENVs from "../utils/Envs.js";

const mongo_url = ENVs.MONGO_URL;

const Databaseconnection = async () => {
    try {
        await mongoose.connect(mongo_url);
        console.log("C A R T D B connecte 🛒 🛒 🛒 🛒 🛒")
    }
    catch (err) {
        console.log("Error in connecting to database ❌ ❌ ❌ ❌", err);
    }
}

export default Databaseconnection;