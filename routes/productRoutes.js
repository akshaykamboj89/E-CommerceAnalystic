const express = require('express');

const { addProduct, deleteProduct, getAllProducts } = require('../controllers/productController');
const { authenticateAdmin } = require('../middlewares/adminMiddleware');

const router = express.Router();

router.post('/add', authenticateAdmin, addProduct); 
router.delete('/delete/:id', authenticateAdmin, deleteProduct);
router.get('/', authenticateAdmin, getAllProducts);


module.exports = router;
