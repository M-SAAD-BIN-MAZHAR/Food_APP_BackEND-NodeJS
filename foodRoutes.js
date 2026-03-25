const express=require("express");
const { createFoodController, getAllFoodController, getSingleFoodController, getFoodByRestaurantController, updateFoodController, deletFoodController, placeOrderController, orderStatusController } = require("./controllers/foodController");
const router=express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
router.post("/create",authMiddleware,createFoodController
)
router.get("/getAll",getAllFoodController);
router.get("/get/:id",getSingleFoodController);
router.get("/getByRestaurant/:id",getFoodByRestaurantController);
router.put("/update/:id",authMiddleware,updateFoodController);
router.delete("/delete/:id",authMiddleware,deletFoodController);
router.post("/placeOrder",authMiddleware,placeOrderController);
router.post("/orderStatus/:id",authMiddleware,orderStatusController);
module.exports=router;