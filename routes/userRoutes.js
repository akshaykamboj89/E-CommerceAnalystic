const express = require('express');
const { getAllUsers } = require('../controllers/userController');
const { authenticateAdmin } = require('../middlewares/adminMiddleware');

const router = express.Router();

router.get('/', authenticateAdmin, getAllUsers);



// router.get('/:userId/orders', authenticateAdmin, getUserOrders);

module.exports = router;
