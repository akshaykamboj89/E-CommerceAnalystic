const User = require('../models/User');
const Order = require('../models/Order');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// exports.getUserOrders = async (req, res) => {
    // try {
        // const orders = await Order.find({ userId: req.params.userId }).populate('products.productId');
        // res.status(200).json(orders);
    // } catch (err) {
        // res.status(500).json({ error: err.message });
    // }
// };
