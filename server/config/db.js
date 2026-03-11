const mongoose=require("mongoose");

const connectDB= async ()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/")
        console.log("mongodb connected")
    }
    catch(error){
        console.log("mongodb failed")
        process.exit(1)
    }
}

module.exports = connectDB;