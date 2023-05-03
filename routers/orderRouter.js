import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

router.route("/")
                 .post(async (req, res) => {
                    try{
                        const {products_id, adress, number} = req.body;

                    if(!products_id || !adress, !number){
                        return res.status(400).json({ message: 'Please fill in all fields' });
                    }

                    const order = await Order.create({products_id, adress, number});
                    res.status(200).json({successfully: true});
                    }
                    catch(e){
                        console.log(e);
                    }
                 })
                 .get(async (req, res) => {
                    try{
                        const orders = await Order.find({})
                        res.status(200).json(orders)
                    }
                    catch(e){
                        console.log(e)
                    }
                 })
                 .delete(async (req, res) => {
                    try{
                        const {_id} = req.body;
                        if(Order.findById(_id)){
                            const order = await Order.findByIdAndDelete({_id});
                            res.status(200).json({deleted: true})
                        }
                    }
                    catch(e){
                        console.log(e)
                    }
                 })

export default router;
