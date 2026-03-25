const express=require("express");
const { getUserController, updateUserController,updatePasswordController,resetPasswordController,deleteProfileController } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router=express.Router();

router.get("/get-user",authMiddleware,getUserController)
router.put("/update-user",authMiddleware,updateUserController);
router.post("/update-password",authMiddleware,updatePasswordController);
router.post("/reset-password",resetPasswordController);
router.delete("/delete-user",authMiddleware,deleteProfileController);


module.exports=router;