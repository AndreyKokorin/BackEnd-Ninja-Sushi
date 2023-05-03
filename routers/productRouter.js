import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

router.route("/")
                    //добавление товара
                    .post(async (req, res) => {
                        try{
                            const {productName, weight, img, price, type,description}  = req.body;

                            if(!productName|| !weight || !img || !price || !type || !description){
                               return res.status(400).json({ message: 'Please fill in all fields' })
                            }

                            const existingProduct = await Product.findOne({productName})
                            if(existingProduct){
                                return res.status(400).json({ message: 'Product with this email already exists' })
                            }

                            const product = await Product.create({productName, weight, img, price, type, description});
                            res.status(200).json(product);
                        }
                        catch(e){
                            res.status(500).json(e)
                        }
                    })
                    //поиск потава по id, типу                       
                    .get(async (req, res) => {
                        const { _id, type} = req.query;
                        const criterion = {};

                        if(_id){
                            criterion = {_id};
                        }
                        if(type){
                            criterion = {type};
                        }
                        const products = await Product.find(criterion);
                        res.status(200).json(products);
                    }) 
                    //изменение данных товара
                    .patch(async (req, res) => {
                    const {_id,productName, weight, img, price, type} = req.body;
                    const updates = {productName, weight, img, price, type}
                    const product = await  Product.findOneAndUpdate(
                    {_id},
                    updates)
                    })
                    //удаление товара
                    .delete(async (req,res) => {
                    try{
                        const {_id} = req.body;
                         
                        if(Product.findById(_id)){
                            return res.status(400).json({ message: 'id havent' })
                        }

                        const product = await Product.findByIdAndDelete({_id});
                        res.status(200).json(JSON.stringify({delited: true}))
                    }
                    catch(e){
                        console.log(e)
                    }
                    })


export default router;