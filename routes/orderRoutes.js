const express=require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { placeOrderController, orderStatusController } = require('../controllers/foodController');

const router=express.Router();

router.post('/placeOrder',authMiddleware,placeOrderController);
router.post('/orderStatus/:id',authMiddleware,orderStatusController);

module.exports=router;
