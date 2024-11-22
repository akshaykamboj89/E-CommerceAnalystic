const express = require('express');
const { addProduct, deleteProduct } = require('../controllers/productController');
const { authenticateUser } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/add', authenticateUser, addProduct); 
router.delete('/delete/:id', authenticateUser, deleteProduct);

module.exports = router;
