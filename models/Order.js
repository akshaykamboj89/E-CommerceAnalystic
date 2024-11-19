const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: Number,
        },
    ],
    totalAmount: Number,
    orderDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
