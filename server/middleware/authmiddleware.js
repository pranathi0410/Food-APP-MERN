const jwt=require("jsonwebtoken")
const authMiddleWare=(req,res,next)=>{
    const authHeader = req.headers.authorization;


if(!authHeader){
    return res.status(401).json({message:"no token provided"});
}
const token= authHeader.split(" ")[1];

try{
    const decoded= jwt.verift(token,"supersecretkey")
    req.userId=decoded.id;
    next();
}catch(error){
    res.status(401).json({message:"Invalid token"})
}
}
module.exports=authMiddleWare;
