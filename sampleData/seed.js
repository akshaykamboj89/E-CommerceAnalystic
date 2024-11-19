const mongoose = require('mongoose');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
require('dotenv').config();
const connectDB = require('../config/db');

connectDB();

const seedData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        const users = await User.insertMany([
            { name: 'John Doe', email: 'john@example.com', age: 25 },
            { name: 'Jane Smith', email: 'jane@example.com', age: 30 },
        ]);

        const products = await Product.insertMany([
            { name: 'Laptop', price: 1000, category: 'Electronics', stock: 5 },
            { name: 'Phone', price: 500, category: 'Electronics', stock: 50 },
        ]);

        await Order.insertMany([
            {
                userId: users[0]._id,
                products: [{ productId: products[0]._id, quantity: 2 }],
                totalAmount: 2000,
            },
        ]);

        console.log('Sample data inserted');
        process.exit();
    } catch (err) {
        console.error('Error inserting sample data:', err.message);
        process.exit(1);
    }
};

seedData();
