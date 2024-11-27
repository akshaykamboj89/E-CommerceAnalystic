// const mongoose = require('mongoose');
// const User = require('../models/User');
// const Product = require('../models/Product');
// const Order = require('../models/Order');
// const bcrypt = require('bcrypt');
// require('dotenv').config();
// const connectDB = require('../config/db');

// connectDB();

// const seedData = async () => {
//     try {
//         await User.deleteMany();
//         await Product.deleteMany();
//         await Order.deleteMany();

//         // Create Users
//         const users = await User.insertMany([
//             { name: 'User 1', email: 'user1@example.com', password: await bcrypt.hash('password123', 10), age: 25 },
//             { name: 'User 2', email: 'user2@example.com', password: await bcrypt.hash('password123', 10), age: 28 },
//             { name: 'User 3', email: 'user3@example.com', password: await bcrypt.hash('password123', 10), age: 32 },
//             { name: 'User 4', email: 'user4@example.com', password: await bcrypt.hash('password123', 10), age: 27 },
//             { name: 'User 5', email: 'user5@example.com', password: await bcrypt.hash('password123', 10), age: 30 },
//             { name: 'User 6', email: 'user6@example.com', password: await bcrypt.hash('password123', 10), age: 24 },
//             { name: 'Admin User', email: 'admin@example.com', password: await bcrypt.hash('adminpass', 10), age: 35, role: 'admin' }, // Admin user
//         ]);

//         // Create Products
//         const products = await Product.insertMany([
//             { name: 'Laptop', price: 1000, category: 'Electronics', stock: 10 },
//             { name: 'Phone', price: 500, category: 'Electronics', stock: 20 },
//             { name: 'Headphones', price: 200, category: 'Accessories', stock: 15 },
//         ]);

//         // Create Orders for each user
//         for (let i = 0; i < 6; i++) {
//             await Order.insertMany([
//                 {
//                     userId: users[i]._id,
//                     products: [
//                         { productId: products[0]._id, quantity: 1 },
//                         { productId: products[1]._id, quantity: 2 },
//                     ],
//                     totalAmount: products[0].price * 1 + products[1].price * 2,
//                 },
//                 {
//                     userId: users[i]._id,
//                     products: [
//                         { productId: products[2]._id, quantity: 3 },
//                     ],
//                     totalAmount: products[2].price * 3,
//                 },
//             ]);
//         }

//         console.log('Sample data inserted');
//         process.exit();
//     } catch (err) {
//         console.error('Error inserting sample data:', err.message);
//         process.exit(1);
//     }
// };

// seedData();
