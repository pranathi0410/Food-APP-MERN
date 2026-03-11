const Order= require("../models/Order")
const Cart= require("../models/Cart")
exports.createOrder = async(req,res)=>{
    try{
        const {userId} = req.body;
        const cart = await Cart.findOne({userId})

        if(!cart || cart.items.length ===0){
            return res.status(400).json({message:"cart is empty"})
        }
        
        const totalAmount=cart.items.reduce(
            (acc,item)=> acc + item.price * item.quantity , 0
        );

        const newOrder= new Order({
            userId,
            resId : cart.resId,
            items: cart.items,
            totalAmount
        })

        await newOrder.save();

        await Cart.deleteOne({userId})

        res.json({
            message: "Order placed succesfully",
          order:newOrder
        })
    }catch(error){
        console.error(err)
        res.status(500).json({message:"error creating order"})
    }
}

exports.clearAll= async(req,res)=>{
    try{
        await Order.deleteMany({})
        res.json({message:"All orders cleared"})
    }catch(err){
        res.status(500).json({message:"error clearing orders"})
    }
}

exports.getAllOrders = async(req,res)=>{
    try{
        const {userId} = req.params;
        const orders= await Order.find({userId})
        res.json(orders)
    }
    catch(error){
        res.status(500).json({message:"Error fetching orders"})
    }
}

