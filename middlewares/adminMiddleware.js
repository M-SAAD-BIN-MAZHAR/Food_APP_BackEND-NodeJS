module.exports=async(req,res,next)=>{
    try{
const user=await userModel.findById(req.body.id);
if(user.userType!=="admin"){
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