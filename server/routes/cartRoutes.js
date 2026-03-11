const express=require("express")
const router= express.Router();

const {addToCart,getCart,clearCart,updateQuantity} = require("../controllers/cartController")

router.post("/add",addToCart)

router.get("/:userId",getCart)

router.delete("/clear/:userId",clearCart)
router.post("/update", updateQuantity);

module.exports=router;