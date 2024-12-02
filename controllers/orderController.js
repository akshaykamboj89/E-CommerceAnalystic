
const jwt = require('jsonwebtoken');
const Order = require('../models/Order');
const path = require('path');
const User = require('../models/User');
const { sendEmail } = require('../services/emailService');

exports.createOrder = async (req, res) => {
    try {
        const { products } = req.body;

        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: "Products are required and should be a non-empty array." });
        }

        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Authentication token is required." });
        }

        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedUser.id);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const newOrder = new Order({ userId: user._id, products });
        await newOrder.save();

        // order confirmation email
        const templatePath = path.join(__dirname, '../emails/orderConfirmation.ejs');
        await sendEmail(user.email, "Order Confirmation", templatePath, { user, products });

        res.status(201).json({
            message: "Order created successfully and confirmation email sent.",
            order: newOrder,
        });
    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).json({ error: err.message });
    }
};

//Get all orders for the authenticated user
exports.getAllOrders = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const orders = await Order.find({ userId }).populate('userId', 'name email');

        if (orders.length === 0) {
            return res.status(404).json({ message: "No orders found for this user." });
        }

        res.status(200).json({ orders });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
