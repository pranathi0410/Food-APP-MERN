const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.get("/getAllUsers",async(req,res)=>{
    try{
        const users=await User.find();
        res.json(users)
    }catch(error){
        res.status(500).json({message:"server error"})
    }
})

router.post("/register",async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        //checking if user exist
        const userExist=await User.findOne({email})
        if(userExist){
            return res.status(400).json({message:"User already exist"})

        }
        const hashedPassword= await bcrypt.hash(password,10)

        const user= await User.create({
            name,
            email,
            password:hashedPassword
        })
        res.status(201).json({
            message:"User registered successfully",
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            }
        })
    }
    catch(error){
        
        res.status(500).json({message:"server error"})
    }
})

router.post("/login",async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        const user=await User.findOne({email});
        if(!user){
           res.status(400).json({message:"No user found"})
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            res.status(400).json({message:"Invalid credentials"})
        }

        const token= jwt.sign(
           { id:user._id},
           "supersecretkey",
           {expiresIn:"1d"}
        );
        res.json({
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            }
        })
    }  
    catch(error){
        res.status(500).json({message:"Server error"})
    }
})

module.exports= router;