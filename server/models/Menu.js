const mongoose= require("mongoose")

const menuSchema= new mongoose.Schema({
    resId:{
        type:Number,
        required:true
    },
    itemId:{
        type:Number,
        required:true
    },
    name:{
        type:String,
    },
    category:{
     type:String
    },
    isVeg:{
     type:Boolean,
    },
    price:{
        type:Number
    }
},{timestamps:true})

module.exports=mongoose.model("Menu", menuSchema)