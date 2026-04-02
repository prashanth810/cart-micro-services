import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import ENVS from '../../authservice/src/utils/Envs.js';
import Databaseconnection from './config/Databaseconnection.js';

const app = express();
const PORT = ENVS.PORT || 2001;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cors());
app.use(morgan('dev'));

// db connection 
Databaseconnection().then((result) => {
    app.listen(PORT, () => {
        console.log("cart service running 🛒 🛒 🛒 🛒 🛒")
    })
}).catch((err) => {
    console.log("Failed start server ❌ ❌ ❌ ❌ ❌")
});

