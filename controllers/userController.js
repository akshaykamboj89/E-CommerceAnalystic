const Order = require('../models/Order');

exports.getUserOrderHistory = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.id }).populate('products.productId');
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
