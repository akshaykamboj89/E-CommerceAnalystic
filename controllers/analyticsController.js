const { sendEmail } = require('../services/emailService');
const Order = require('../models/Order');
const Product = require('../models/Product');
const path = require('path');

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
exports.getLowStock = async (req, res) => {
    try {
        const lowStockThreshold = 10;
        const products = await Product.find({ stock: { $lt: lowStockThreshold } });

        if (products.length === 0) {
            return res.status(200).json({ message: "No products are below the low-stock threshold." });
        }

        // Send email to admin
        const templatePath = path.join(__dirname, '../emails/lowStock.ejs');
        await sendEmail(
            process.env.ADMIN_EMAIL,
            'Low Stock Alert',
            templatePath,
            { products }
        );

        res.status(200).json({
            message: "Low stock products retrieved and email sent to admin.",
            totalLowStock: products.length,
            products,
        });
    } catch (err) {
        console.error('Error:', err.message);
        res.status(500).json({ error: err.message });
    }
};




// exports.getLowStock = async (req, res) => {
    // try {
        // const lowStockThreshold = 10;
// 
        // 
        // const products = await Product.find({ stock: { $lt: lowStockThreshold } });
// 
        // Check if there are low-stock products
        // if (products.length === 0) {
            // return res.status(200).json({
                // message: "No products are below the low-stock threshold.",
                // lowStockThreshold,
                // products: [], // Return an empty array
            // });
        // }
// 
    // 
        // res.status(200).json({
            // message: "Low stock products retrieved successfully.",
            // lowStockThreshold,
            // totalLowStock: products.length,
            // products, 
        // });
    // } catch (err) {
        // 
        // res.status(500).json({ error: err.message });
    // }
// };
// 