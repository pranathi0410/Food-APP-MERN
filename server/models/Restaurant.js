const mongoose= require("mongoose")

const restaurantSchema= new mongoose.Schema({
    resId:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required: true
    },
    cuisines:{
         type:[String],
         required:true
    },
    locality:{
        type:String
    },
    areaName:{
        type:String
    },
    rating:{
        type:Number,
        default:0
    },
    deliveryTime:{
        type:Number
    },
    image:{
        type:String
    },
    
},
{ timestamps:true }
)

module.exports=mongoose.model("Restaurant", restaurantSchema)