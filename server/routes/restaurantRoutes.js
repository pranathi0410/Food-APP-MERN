const express= require("express")
const router = express.Router();
const Restaurant=require("../models/Restaurant");

router.get("/",async(req,res)=>{
    try{
        const restaurants= await Restaurant.find();
        res.json(restaurants)
    }catch(error){
        res.status(500).json({message:"server error"})
    }
})

router.get("/:id",async(req,res)=>{
    console.log(req.params.id)
    try{
        const restaurant=await Restaurant.findOne({resId:req.params.id})
        console.log(restaurant)
        if(!restaurant){
            return res.status(404).json({message:"Restaurant not found"})
        }
        res.json(restaurant)
    }catch(error){
        res.status(500).json({message:"Server error"})
    }
})

router.post("/",async(req,res)=>{
    try{
        const restaurant= new Restaurant(req.body);
        const savedRestaurant= await restaurant.save();
        res.status(200).json(savedRestaurant)
    }catch(error){
        res.status(500).json({message:"Server error"})
    }
})
router.post("/bulk",async(req,res)=>{
    try{
        const restaurants= await Restaurant.insertMany(req.body);
        res.status(200).json(restaurants)
    }catch(error){
        res.status(500).json({message:"Server error"})
    }
})

router.delete("/deleteAll",async(req,res)=>{
    try{
        
        const result = await Restaurant.deleteMany({});
        res.json({ message: "All restaurants deleted", deletedCount: result.deletedCount });
    }catch(error){
        res.status(500).json({message:"server error"})
    }
})

module.exports=router;

