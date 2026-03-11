const express= require("express")
const router=express.Router();
const {getAllMenu,getMenuForRes,createMenu,createBulkMenu,deleteAllMenu,deleteById} = require("../controllers/menuController")



router.get("/getAll",getAllMenu)

router.get("/:resId",getMenuForRes)

router.post("/",createMenu)

router.post("/bulk",createBulkMenu)

router.delete("/deleteAll",deleteAllMenu)

router.delete("/deleteById",deleteById)

module.exports=router;