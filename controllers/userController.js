const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');

const getUserController= async (req,res) =>{
    try{
        const user=await userModel.fingById({ _id:req.body.id});
        if(!user){
            return ste.status(404).send({
                success:false,
                message:"User not found"
            })
        }
        user.password=undefined;
        res.status(200).send({
            success:true,
            message:"User fetched successfully",
            user
        })
    }
    catch(err){
        return res.status(500).send({
            success:false,
            message:"Internal server error",
            err
        })
    }
    
}
const updateUserController=async (req,res)=>{
    try{
      const user=await userModel.findById({ _id:req.body.id});
      if(!user){
        return res.status(404).send({
            success:false,
            message:"User not found"
        })
      }
      const {userName,address,phone} = req.body;
      if(userName) user.userName=userName;
        if(address) user.address=address;
        if(phone) user.phone=phone;
        await user.save();
        res.status(200).send({
            success:true,
            message:"Profile Updated Successfully",
            user
        })
    }catch(err){
        return res.status(500).send({
            success:false,
            message:"Internal server error",
            err
        })
    }
}

const updatePasswordController=async (req,res)=>{
    try{
   const user=await userModel.findById({_id:req.body.id});
    if(!user){
        return res.status(404).send({
            success:false,
            message:"User not found"
        })
    }
    const {oldPassword,newPassword}=req.body;
    if(!oldPassword || ! newPassword){
        return res.status(400).send({
            success:false,
            message:"Please fill all the fields"
        })
    }
    const isMatch=await bcrypt.compare(oldPassword,user.password);
    if(!isMatch){
        return res.status(400).send({
            success:false,
            message:"Old password is incorrect"
        })
    }
    var salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(newPassword,salt);

    user.password=hashedPassword;
    await user.save();
     res.status(200).send({
        success:true,
        message:"Password Updated Successfully"
     })
    }
    catch(err){
        return res.status(500).send({
            success:false,
            message:"Internal server error",
            err
        })

    }
}
const resetPasswordController=async (req,res)=>{
    try{
       const user=await userModel.findOne({email,answer})
       const {email,answer,newPassword}=req.body;
         if(!email || !answer || !newPassword){
            return res.status(400).send({
                success:false,
                message:"Please fill all the fields"
            })
         }
         if(!user){
            return res.status(404).send({
                success:false,
                message:"Wrong Email or Answer"
            })
         }
         var salt=bcrypt.genSaltSync(10);
         const hashedPassword=await bcrypt.hash(newPassword,salt);
         user.password=hashedPassword;
            await user.save();
            res.status(200).send({
                success:true,
                message:"Password Reset Successfully"
            })
        
    }
    catch(error){
        return res.status(500).send({
            success:false,
            message:"Internal server error",
            error
        })
    }
}
const deleteProfileController=async (req,res)=>{
    try{
         await userModel.findByIdAndDelete(req.params.id);
         return res.status(200).send({
            success:true,
            message:"Profile Deleted Successfully"
         })
    }
    catch(error){
        return res.status(500).send({
            success:false,
            message:"Internal server error",
            error
        })
    }
}

module.exports={getUserController,updateUserController,updatePasswordController,resetPasswordController,deleteProfileController};