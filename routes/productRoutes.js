const express = require('express');
const upload = require('../middlewares/uploadMiddleware');
const { 
    addProduct, 
    deleteProduct, 
    getAllProducts, 
    updateProduct 
} = require('../controllers/productController');
const { authenticateAdmin } = require('../middlewares/adminMiddleware');

const router = express.Router();
router.post('/add', authenticateAdmin, upload.array('images', 4), addProduct);
router.delete('/delete/:id', authenticateAdmin, deleteProduct);
router.put('/update/:id', authenticateAdmin, upload.array('images', 4), updateProduct);
router.get('/', authenticateAdmin, getAllProducts);

module.exports = router;
