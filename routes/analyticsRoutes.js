const express = require('express');
const {
    getSalesByCategory,
    getTopCustomers,
    getMonthlySales,
    getLowStock,
} = require('../controllers/analyticsController');
const { authenticateAdmin } = require('../middlewares/adminMiddleware');

const router = express.Router();

router.get('/sales-by-category', authenticateAdmin, getSalesByCategory);
router.get('/top-customers', authenticateAdmin, getTopCustomers);
router.get('/monthly-sales', authenticateAdmin, getMonthlySales);
router.get('/low-stock', authenticateAdmin, getLowStock);

module.exports = router;
