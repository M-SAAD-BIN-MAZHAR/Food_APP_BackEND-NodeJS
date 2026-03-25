const mongoose=require("mongoose");
const categorySchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Category name is required"],
    },
    imageUrl:{
        type:String,
        default:"https://i.ibb.co/7J8860D/1603727866042.jpg",
    }
},{timestamps:true});
module.exports=mongoose.model("Category",categorySchema);