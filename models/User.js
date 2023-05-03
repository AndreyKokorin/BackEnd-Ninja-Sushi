import mongoose from "mongoose";

const User = new mongoose.Schema({
    userName: {type: String, required: true},
    password: {type: String, required: true},
    busket: {type: Array, required: true},
})

export default mongoose.model("User", User)