const express=require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const {
  createFoodController,
  getAllFoodController,
  getSingleFoodController,
  getFoodByRestaurantController,
  updateFoodController,
  deletFoodController
} = require('../controllers/foodController');

const router=express.Router();

router.post('/create',authMiddleware,createFoodController);
router.get('/getAll',getAllFoodController);
router.get('/get/:id',getSingleFoodController);
router.get('/getByRestaurant/:id',getFoodByRestaurantController);
router.put('/update/:id',authMiddleware,updateFoodController);
router.delete('/delete/:id',authMiddleware,deletFoodController);

module.exports=router;
