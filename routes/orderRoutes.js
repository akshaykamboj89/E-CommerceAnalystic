const express = require("express");
const { createOrder, getAllOrders } = require("../controllers/orderController");
const { authenticateUser } = require('../middlewares/authMiddleware');
const router = express.Router();

// Create a new order
router.post("/", authenticateUser, createOrder);

// Get all orders
//router.get('/my-orders',authenticateUser , getAllOrders);
router.get('/:userId', authenticateUser, getAllOrders);

module.exports = router;
