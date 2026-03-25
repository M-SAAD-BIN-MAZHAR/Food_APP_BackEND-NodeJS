const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:[true,"User name is required"]
    },
    email:{
        type:String,
        required:[true,"Email is Required"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Password is Required"]
    },
    address:{
        type:Array,
    },
    phone:{
        type:String,
        required:[true,"Phone number is required"]
    },usertype:{
        type:String,
        required:[true,"User type is required"],
        default:"client",
        enum:["client","admin","vendor","driver"]
    },
    profile:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"

    },
    answer:{
        type:String,
        required:[true,"Answer is required"]
    },
},{timestamps:true}
)
module.exports=mongoose.model("User",userSchema)