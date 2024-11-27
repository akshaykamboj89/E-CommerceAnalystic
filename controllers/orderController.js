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
const User = require('../models/User'); 
const Order = require('../models/Order'); 

// Create a new order
exports.createOrder = async (req, res) => {
    try {
        const { name, email, password, products } = req.body;

        
        let user = await User.findOne({ email });
        
        if (!user) {
            
            user = new User({
                name,
                email,
                password, 
            });

            await user.save();
        }

        
        if (!products || products.length === 0) {
            return res.status(400).json({ message: "Products are required to create an order" });
        }

    
        const newOrder = new Order({
            userId: user._id, 
            products
        });

        await newOrder.save();

        res.status(201).json({ message: "Order created successfully", order: newOrder });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all orders for the authenticated user
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


