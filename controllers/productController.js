const Product = require('../models/Product');
const mongoose = require('mongoose')


exports.addProduct = async (req, res) => {
    const { name, price, category, stock } = req.body;

    try {
        const product = await Product.create({ name, price, category, stock });
        res.status(201).json({ message: 'Product added successfully', product });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.deleteProduct = async (req, res) => {
    const { id } = req.params;


    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid Product ID' });
    }

    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};