const express=require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createResturantController, getAllResturantController, getResturantByIdController, deleteResturantByIdController } = require("../controllers/resturantController");


const router=express.Router();
router.post("/create",authMiddleware,createResturantController)
router.get("/getAll",authMiddleware,getAllResturantController)
router.get("/get/:id",authMiddleware,getResturantByIdController)
router.delete("/delete/:id",authMiddleware,deleteResturantByIdController)
module.exports=router;