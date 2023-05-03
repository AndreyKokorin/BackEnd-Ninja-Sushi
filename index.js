import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import userRouter from './routers/userRouter.js'
import productRouter from "./routers/productRouter.js"
import orderRouter from "./routers/orderRouter.js"

const app = express();

app.use(cors());
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 5000;
const DB_URL = "mongodb+srv://user:user@cluster1.xg3d2uz.mongodb.net/?retryWrites=true&w=majority"; 


app.use("/users", userRouter); 
app.use("/products", productRouter);
app.use("/orders", orderRouter);

async function startApp (){
    try{
        mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true});
        app.listen(PORT, () => console.log("server has been started"));
    }
    catch(e){
        console.log(e);
    }
}

startApp();