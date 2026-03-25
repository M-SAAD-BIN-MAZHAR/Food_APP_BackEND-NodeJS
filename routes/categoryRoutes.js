const express=require('express');
const { createCatController, getAllCatController, updateCatController, deleteCatController } = require('../controllers/categoryController');

const router=express.Router();

router.post('/create',createCatController);
router.get('/getAll',getAllCatController);
router.put('/update/:id',updateCatController);
router.delete('/delete/:id',deleteCatController);

module.exports=router;
