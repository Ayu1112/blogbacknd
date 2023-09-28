const express=require("express");

const userRouter=express.Router();

const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const { userModel } = require("../models/user.model");

require('dotenv').config();

userRouter.post('/signup',async(req,res)=>{
    const {email,password,name,image}=req.body
console.log(req.body);
    try{
       const user=await userModel.findOne({email});
       if(user){
        res.json({msg:"user already registered,please login"})
       }else{
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                res.json({error:err.message})
            }else{
               
                const user=new userModel({email,password:hash,image,name})
                await user.save()
                res.json({msg:"user registered successfully",user:req.body})
            }
        })
       } 
    }catch(err){
        res.json({error:err.message})
    }
})

userRouter.post('/login', async(req,res)=>{
    //logic
    const {email,password}=req.body;
console.log(email);
    try {
        const user=await userModel.findOne({email})
        if(user){
bcrypt.compare(password,user.password,(err,result)=>{
    if(result){
        let token=jwt.sign({userId:user._id,user:user.name},process.env.secret)
        res.json({msg:"Login Success",token})
    }else{
        res.json({msg:"Login Failure//Wrong credantials"})
    }
})
        }else{
            res.json({msg:"user not found"})
        }
    } catch (error) {
        res.json({error:error.message})
    }
})



module.exports = { userRouter };