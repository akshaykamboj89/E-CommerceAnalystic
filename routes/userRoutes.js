const express = require('express');
const { getAllUsers } = require('../controllers/userController');
const { authenticateAdmin } = require('../middlewares/adminMiddleware');

const router = express.Router();

router.get('/', authenticateAdmin, getAllUsers);

module.exports = router;
