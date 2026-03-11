const mongoose = require("mongoose")
const orderSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    resId:{
        type:Number,
    },
    items:[
      {
        itemId:String,
        name:String,
        price:Number,
        quantity:Number
      },
    ],
     totalAmount: Number,
     status:{
        type:String,
        default:"PLACED"
     }

},{ timestamps:true}
)
module.exports= mongoose.model("Order",orderSchema)