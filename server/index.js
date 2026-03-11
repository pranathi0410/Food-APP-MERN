const express = require("express");
const cors = require("cors");

const connectDB= require("./config/db")
const authRoutes= require("./routes/authRoutes")
const restaurantRoutes=require("./routes/restaurantRoutes")
const menuRoutes=require("./routes/menuRoutes")
const cartRoutes=require("./routes/cartRoutes")
const orderRoutes= require("./routes/orderRoutes")


const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes)
app.use("/api/restaurants",restaurantRoutes)
app.use("/api/restaurant/menu",menuRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/order",orderRoutes)

connectDB();

app.listen(5000, () => console.log("Server running on port 5000"));


