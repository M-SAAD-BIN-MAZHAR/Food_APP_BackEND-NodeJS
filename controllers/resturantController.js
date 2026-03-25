const resturantModel = require("../models/resturantModel");

const createResturantController= async(req,res)=>{
    try{
        const {title,imageUrl,foods,time,pickup,delivery,isOpen,logoUrl,rating,ratingCount,code,coords}=req.body;
        if(!title || !coords){
            return res.status(400).send({
                success:false,
                message:"Please Provide title and Address",
            });
        }
        const resturant=new resturantModel({
            title,imageUrl,foods,time,pickup,delivery,isOpen,logoUrl,rating,ratingCount,code,coords
        });
        await resturant.save();
        res.status(201).send({
            success:true,
            message:"Resturant Created Successfully",
            resturant
        });
    }catch(error){
        res.status(500).send({
            success:false,
            message:"Please Provide title and Address",
        });
    }
}
const getAllResturantController= async(req,res)=>{
    try{

      const resturants=await resturantModel.find({});
      if(!resturants){
        return res.status(404).send({
            success:false,
            message:"No Resturants Found"
        })
      }
      res.status(200).send({
        success:true,
        message:"Resturants fetched successfully",
        resturants
      })
    }catch(error){
        res.status(500).send({
            success:false,
            message:"Error in getting resturants",
            error
        })
    }
       



    }
const getResturantByIdController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "Please Provide Resturnat ID",
      });
    }
    //find resturant
    const resturant = await resturantModel.findById(resturantId);
    if (!resturant) {
      return res.status(404).send({
        success: false,
        message: "no resturant found",
      });
    }
    res.status(200).send({
      success: true,
      resturant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get Resturarnt by id api",
      error,
    });
  }
};
const deleteResturantByIdController= async(req,res)=>{
    try{
      const resturantId=req.params.id;
      if(!resturantId){
        return res.status(404).send({
          success:false,
          message:"Please Provide Resturant ID"
        })
      }
      await resturantModel.findByIdAndDelete(resturantId);
      res.status(200).send({
        success:true,
        message:"Resturant Deleted Successfully"
      })

    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in deleting resturant",
            error
        })
}
}
module.exports={
    createResturantController,
    getAllResturantController,
    getResturantByIdController,
    deleteResturantByIdController

}
