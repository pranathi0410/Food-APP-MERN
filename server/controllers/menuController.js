const Menu= require("../models/Menu")
const Restaurant=require("../models/Restaurant")

exports.getAllMenu= async(req,res)=>{
    try{
        const menus= await Menu.find()
        if(!menus){
            res.status(404).json({message:"no item found"})
        }
        res.status(200).json(menus)}
        catch(error){
            console.log(error)
            res.status(500).json({message:" error"})
        }
    }
exports.getMenuForRes=async(req,res)=>{
    try {
        const restaurant = await Restaurant.findOne({ resId: req.params.resId });
        const menus = await Menu.find({ resId: req.params.resId });
        if (!restaurant) {
          return res.status(404).json({ message: "Restaurant not found" });
        }
        if (!menus || menus.length === 0) {
          return res.status(404).json({ message: "No menu found for this restaurant" });
        }
        res.json({
          restaurantName: restaurant.name,
          menu: menus
        });
      } catch (error) {
        res.status(500).json({ message: "Server error" });
      }
}

exports.createMenu=async(req,res)=>{
     try {
        const menu = new Menu(req.body);
        const savedMenu = await menu.save();
        res.status(201).json(savedMenu);
      } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error" });
      }
}

exports.createBulkMenu=async(req,res)=>{
 try {
    const menus = await Menu.insertMany(req.body);
    res.status(201).json(menus);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

exports.deleteAllMenu=async(req,res)=>{
     try{
        const result=await Menu.deleteMany({})
        res.json({message:"all menu deleted"})
    }catch(error){
        res.stutus(500).json({message:"server error"})
    }
}
exports.deleteById=async(req,res)=>{
     try {
        const deletedMenu = await Menu.findOneAndDelete({
          itemId: req.params.itemId,
        });
        if (!deletedMenu) {
          return res.status(404).json({ message: "Menu item not found" });
        }
        res.json({ message: "Menu item deleted successfully" });
      } catch (error) {
        res.status(500).json({ message: "Server error" });
      }
}