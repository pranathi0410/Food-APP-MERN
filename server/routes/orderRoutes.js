const express = require("express")
const router = express.Router()

const { createOrder,clearAll,getAllOrders} = require("../controllers/orderControllers")

router.post("/create",createOrder)

router.delete("/clearAll",clearAll)

router.get("/getAll/:userId",getAllOrders)

module.exports= router;