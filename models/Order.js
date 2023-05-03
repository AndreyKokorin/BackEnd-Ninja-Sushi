import mongoose from "mongoose";

const Order = mongoose.Schema({
    products_id: {type: Array, required: true},
    adress: {type: String, required: true},
    number: {type: String, required: true}
})

export default mongoose.model("Order", Order);
