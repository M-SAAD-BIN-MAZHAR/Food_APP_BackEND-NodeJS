const userModel = require("../models/userModel");

module.exports=async(req,res,next)=>{
    try{
const user=await userModel.findById(req.body.id);
if(user.usertype!=="admin"){
    return res.status(403).send({
        success:false,
        message:"Access denied, admin only",
    })
}
next();
    }catch{
        res.status(500).send({
            success:false,
            message:"Internal server error",
            error:"Internal server error"

        })
    }
}