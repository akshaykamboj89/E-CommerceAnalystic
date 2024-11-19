const express = require('express');
const router = express.Router();
const {
    getSalesByCategory,
    getTopCustomers,
    getMonthlySales,
    getLowStockProducts,
} = require('../controllers/analyticsController');

router.get('/sales-by-category', getSalesByCategory);
router.get('/top-customers', getTopCustomers);
router.get('/monthly-sales', getMonthlySales);
router.get('/low-stock', getLowStockProducts);

module.exports = router;
