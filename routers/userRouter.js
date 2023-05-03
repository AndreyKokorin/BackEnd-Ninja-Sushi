import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.route("/")
                    .post(async (req, res) => {
                        try{
                            const {userName, password, busket}  = req.body;
                            

                            if(!userName || !password || !busket){
                                 return res.status(400).json({ message: 'Please fill in all fields' });    
                            } 

                            const existingUser = await User.findOne({userName});
                            if(existingUser){
                                return res.status(400).json({ message: 'User with this email already exists' });
                            } 

                                const user = await User.create({userName, password,busket});
                                res.status(200).json(user);
                                
                        }
                        catch(e){
                            res.status(500).json(e)
                        }
                    })
                    //авторизация
                    .get(async (req, res) => {
                            const {userName, password} = req.query;
                            const user = await User.findOne({userName});
                            if(user && user.password == password){
                                res.status(200).json(user)
                            }
                            else{
                                res.status(400).json({successfully:false})
                            }
                    }) 
                    .patch(async (req, res) => {
                        const {_id, product_obj} = req.body;
                        const user = User.findOneAndUpdate(
                            {_id},
                            {$push: {busket: product_obj}})
                                .then(updateUser => {
                                    res.status(200).json(updateUser)
                                })
                                .catch(e => console.log(e) )
                    })
                   
export default router;