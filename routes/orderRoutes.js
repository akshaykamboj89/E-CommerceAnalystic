const express = require("express");
const { createOrder, getAllOrders } = require("../controllers/orderController");
const { authenticateUser } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post("/", authenticateUser, createOrder);
router.get('/:userId', authenticateUser, getAllOrders);

module.exports = router;
