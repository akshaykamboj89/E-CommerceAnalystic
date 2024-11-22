const express = require('express');
const {
    getSalesByCategory,
    getTopCustomers,
    getMonthlySales,
    getLowStock, 
} = require('../controllers/analyticsController');

const { authenticateUser } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/sales-by-category', authenticateUser, getSalesByCategory);
router.get('/top-customers', authenticateUser, getTopCustomers);   
router.get('/monthly-sales', authenticateUser, getMonthlySales);
router.get('/low-stock', authenticateUser, getLowStock);

module.exports = router;   
