const Order = require('../models/Order');
const Product = require('../models/Product');

// Get sales by category
exports.getSalesByCategory = async (req, res) => {
    try {
        const sales = await Order.aggregate([
            { $unwind: '$products' },
            {
                $lookup: {
                    from: 'products',
                    localField: 'products.productId',
                    foreignField: '_id',
                    as: 'productDetails',
                },
            },
            { $unwind: '$productDetails' },
            {
                $group: {
                    _id: '$productDetails.category',
                    totalSales: { $sum: { $multiply: ['$products.quantity', '$productDetails.price'] } },
                },
            },
        ]);
        res.status(200).json(sales);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get top customers
exports.getTopCustomers = async (req, res) => {
    try {
        const customers = await Order.aggregate([
            {
                $group: {
                    _id: '$userId',
                    totalSpent: { $sum: '$totalAmount' },
                },
            },
            { $sort: { totalSpent: -1 } },
            { $limit: 5 },
        ]);
        res.status(200).json(customers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get monthly sales
exports.getMonthlySales = async (req, res) => {
    try {
        const sales = await Order.aggregate([
            {
                $group: {
                    _id: { $month: '$orderDate' },
                    totalRevenue: { $sum: '$totalAmount' },
                },
            },
            { $sort: { '_id': 1 } },
        ]);
        res.status(200).json(sales);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get low stock products
exports.getLowStock = async (req, res) => {
    try {
        const products = await Product.find({ stock: { $lt: 10 } });
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
