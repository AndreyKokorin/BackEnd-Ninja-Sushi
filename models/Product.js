import mongoose from "mongoose";

const Product = new mongoose.Schema({
    productName: {type: String, required: true},
    weight: {type: String, required: true},
    img: {type: String, required: true},
    price: {type: String, required: true},
    type: {type:String, required: true},
    description: {type:String, required: true}
})

export default mongoose.model("Product", Product)