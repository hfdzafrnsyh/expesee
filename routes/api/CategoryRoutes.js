const express = require('express');
const router = express();

const CategoryController = require('../../controllers/CategoryController');

router.get('/category', CategoryController.getCategory);
router.get('/category/:id', CategoryController.detailCategory);
router.post('/category/create', CategoryController.createdCategory);
router.put('/category/:id', CategoryController.updateCategory);


module.exports = router;