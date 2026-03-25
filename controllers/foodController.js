


const createFoodController=async(req,res)=>{
    try{
     const {title,description,price,imageUrl,foodtags,category,code,isAvailable,resturant,rating}=req.body;
if(!title || !description || !price || !imageUrl || !foodtags || !category || !code || !isAvailable || !resturant || !rating){
    return res.status(400).json({
        success:false,
        message:"All fields are required"
    });
}
const newFood=new foodModel({
    title,
    description,
    price,
    imageUrl,
    foodtags,
    category,
    code,
    isAvailable,
    resturant,
    rating
});
await newFood.save();
res.status(201).json({
    success:true,
    message:"Food created successfully"
});

    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error in creating food"
        });
    }
}
const getAllFoodController=async(req,res)=>{
const foods=await foodModel.find({});
if(!foods){
    return res.status(404).json({
        success:false,
        message:"No food found"
    });
}

res.status(200).json({
    success:true,
    message:"All food fetched successfully",
    foods   
});






}
const getSingleFoodController=async(req,res)=>{

    try{
        const foodId=req.params.id;
        if(!foodId){
            return res.status(404).send({
                success:false,
                message:"please provide id",
            })
        }
        const food=await foodModel.findById(foodId);
        if(!food){
            return res.status(404).send({
                success:false,
                message:"food not found",
            })
        }
        res.status(200).send({
            success:true,
            message:"food fetched successfully",
            food
        });
    }catch(error){
      console.log(error);
        res.status(500).send({
            success:false,
            message:"error in fetching food",
        });
    }
}
const getFoodByRestaurantController=async(req,res)=>{
    try{
        const resturantId=req.params.id;
        if(!resturantId){
            return res.status(404).send({
                success:false,
                message:"please provide id",
            })
        }
        const food=await foodModel.find({resturant:resturantId});
        if(!food){
            return res.status(404).send({
                success:false,
                message:"food not found",
            })
        }
        res.status(200).send({
            success:true,
            message:"food fetched successfully",
            food
        });
         
    }

    catch(error){
       console.log(error);
        res.status(500).send({
            success:false,
            message:"error in fetching food",
        });
    }
}
const updateFoodController=async(req,res)=>{
    try{

        const foodId=req.params.id;
        if(!foodId){
            return res.status(404).json({
                success:false,
                message:"please provide id"
            });
        }
        const food=await foodModel.findByIdAndUpdate(foodId,req.body,{new:true});
        if(!food){
            return res.status(404).json({
                success:false,
                message:"food not found"
            });
        }

    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error in updating food"
        });
    }
}
const deletFoodController=async(req,res)=>{
    try{

        const foodId=req.params.id;
        if(!foodId){
            return res.status(404).json({
                success:false,
                message:"please provide id"
            });
        }
        await foodModel.findByIdAndDelete(foodId);
        res.status(200).json({
            success:true,
            message:"Food deleted successfully"
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error in deleting food"
        });
    }
}
const placeOrderController=async(req,res)=>{
    try{
          const {cart}=req.body;
          if(!cart){
            return res.status(400).send({
                success:false,
                message:"please provide cart",
            });
          }
          let total=0;
          cart.map((i)=>{
            total=total+i.price;
          })
      const newOrder=new orderModel({
    cart,
    totalPrice:total,
    orderStatus:"placed",

      })
      await newOrder.save();
      res.status(201).json({
        success:true,
        message:"Order placed successfully",
            order:newOrder
        
      })
    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error in placing order"
        });
    }
}
const orderStatusController=async(req,res)=>{

    try{
           const orderId=req.params.id;

           if(!orderId){
            return res.status(404).json({
                success:false,
                message:"please provide id"
            });
           }
           const {order}=req.body;
              if(!order){
                return res.status(400).json({
                    success:false,
                    message:"please provide order status"
                });
              }
              const orderUpdate=await orderModel.findByIdAndUpdate(orderId,order,{new:true});

                if(!orderUpdate){
                    return res.status(404).json({
                        success:false,

                        message:"order not found"
                    });
                }
                
    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error in updating order status"
        });
    }
}

module.exports={createFoodController,getAllFoodController,updateFoodController,deletFoodController,placeOrderController,orderStatusController,getAllFoodController,getSingleFoodController,getFoodByRestaurantController}