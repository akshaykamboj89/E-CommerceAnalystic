// const Order = require("../models/Order");

// // Create a new order
// exports.createOrder = async (req, res) => {
//     try {
//         const { userId, products } = req.body;

//         // Check if products are provided
//         if (!products || products.length === 0) {
//             return res.status(400).json({ message: "Products are required to create an order." });
//         }

//         // Create the new order
//         const newOrder = new Order({
//             userId,
//             products
//         });

//         await newOrder.save();

//         res.status(201).json({ message: "Order created successfully", order: newOrder });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// // Get all orders
// exports.getAllOrders = async (req, res) => {
//     try {
//         // Retrieve all orders and populate product details
//         const orders = await Order.find().populate("products.productId");

//         res.status(200).json(orders);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };
const jwt = require('jsonwebtoken');
const Order = require('../models/Order');
const User = require('../models/User');
const { sendEmail } = require('../services/emailService');

exports.createOrder = async (req, res) => {
    try {
        const { products } = req.body;

        // Validate input: Products must be a non-empty array
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: "Products are required and should be a non-empty array." });
        }

        // Extract token from the Authorization header
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Authentication token is required." });
        }

        // Verify token and extract user details
        let decodedUser;
        try {
            decodedUser = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ message: "Invalid or expired token." });
        }

        // Find the user from the database using decoded user ID
        const user = await User.findById(decodedUser.id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Create the order for the logged-in user
        const newOrder = new Order({
            userId: user._id,
            products,
        });

        await newOrder.save();
        console.log(`Order created successfully for user: ${user.email}`);

        let emailStatus = "Email sent successfully";

        // Send email to the logged-in user
        try {
            const emailText = `
                Dear ${user.name},

                Your order has been successfully placed. 
                Order ID: ${newOrder._id}

                Thank you for shopping with us!

                Regards,
                E-Commerce Team
            `;
            await sendEmail(user.email, "Order Placed Successfully", emailText);
            console.log(`Email sent to ${user.email}`);
        } catch (err) {
            emailStatus = `Failed to send email: ${err.message}`;
            console.error(`Error sending email to ${user.email}: ${err.message}`);
        }

        // Respond to the client
        res.status(201).json({
            message: "Order created successfully",
            order: newOrder,
            emailStatus,
        });
    } catch (err) {
        console.error("Error in createOrder function:", err.message);
        res.status(500).json({
            message: "An error occurred while creating the order.",
            error: err.message,
        });
    }
};


//Get all orders for the authenticated user
exports.getAllOrders = async (req, res) => {
    try {
        // Get the userId from the URL params (e.g., /api/orders/:userId)
        const { userId } = req.params;

        // Check if the user exists before querying orders
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Fetch orders for the given userId
        const orders = await Order.find({ userId }).populate('userId', 'name email');

        if (orders.length === 0) {
            return res.status(404).json({ message: "No orders found for this user." });
        }

        res.status(200).json({ orders });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
