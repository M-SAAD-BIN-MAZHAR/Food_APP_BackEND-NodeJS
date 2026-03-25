const userModel = require("../models/userModel");
const bcrypt=require("bcryptjs");
const JWT=require("jsonwebtoken");


const registerController=async (req,res)=>{
    try{


        const {userName,email,password,phone,address,answer}=req.body;
        if(!userName ||!email||!password||!phone||!address||!answer){
            return res.status(500).send({
                success:false,
                message:"Please fill all the Fields"
            });
        }
        const exisiting=await userModel.findOne({email});
        if(exisiting){
            return res.status(500).send({
                success:false,
                message:"Already Registered Please Login"
            });
        }  
        var salt =bcrypt.genSaltSync(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        
        const user=await userModel.create({
            userName,email,password:hashedPassword,phone,address,answer
        });
        res.status(201).send({success:true,
            message:"Successfully Registered",
            user:user,
        });
            
    }
     
    
    
    
    
    catch(err){
        console.log(err);
        res.status(500).send({
            success:false,
            message:"Error in Login API",
            error:err.message

        })
    }
}



const loginController=async (req,res)=>{
try{
const {email,password}=req.body;
if(!email ||!password){
    return res.status(500).send({
        success:false,
        message:"Please fill all the Fields"
    });

}
const user = await userModel.findOne({email});
if(!user){
    return res.status(404).send({
        success:false,
        message:"User not found"
    })
}
const isMatch=await bcrypt.compare(password,user.password);
if(!isMatch){
    return res.status(500).send({
        success:false,
        message:"Invalid Password"
    })  
}
const token =JWT.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
user.password=undefined;
res.status(200).send({
    success:true,
    message:"Login Successfully",
    user,
    token
});


}catch(err){
    console.log(err);
    res.status(500).send({
        success:false,
        message:"Error in Login API",
        error:err.message
    })
}
}
module.exports={registerController,loginController}