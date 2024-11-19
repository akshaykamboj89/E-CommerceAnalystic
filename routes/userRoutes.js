const express = require('express');
const router = express.Router();
const { getUserOrderHistory } = require('../controllers/userController');

router.get('/:id/order-history', getUserOrderHistory);

module.exports = router;
