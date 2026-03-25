const mongoose=require("mongoose");
const foodSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Food name is required"],
    },
    description:{
        type:String,
        required:[true,"Food description is required"],
    },
    price:{
        type:Number,
        required:[true,"Food price is required"],
    },
    imageUrl:{
         type:String,
         default:"https://i.ibb.co/7J8860D/1603727866042.jpg",
    },
    foodTags:{
        type:String,
    },

    category:{
        type:String,
        required:[true,"Food category is required"],
    },
    code:{
        type:String,
    },
    isAvailable:{
        type:Boolean,
        default:true,
    },

    resturant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Resturant",
    },
    rating:{
        type:Number,
        default:5,
        min:1,
        max:5
    },
    ratingCount:{
        type:String,
    }
},{timestamps:true});

module.exports=mongoose.model("Food",foodSchema);