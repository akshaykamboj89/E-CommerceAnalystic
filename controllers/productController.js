const Product = require('../models/Product');
const mongoose = require('mongoose')
const { v2: cloudinary } = require('cloudinary');

exports.addProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;

        if (!name || !description || !price || !category || !stock) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const imageUrls = [];
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: "product-images",
                });
                imageUrls.push(result.secure_url);
            }
        }

        const newProduct = new Product({
            name,
            description,
            price,
            category,
            stock,
            images: imageUrls,
        });

        await newProduct.save();

        res.status(201).json({
            message: "Product created successfully!",
            product: newProduct,
        });
    } catch (err) {
        console.error("Error creating product:", err.message);
        res.status(500).json({ error: "Internal server error" });
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
        // Delete images from Cloudinary
        if (product.images && product.images.length > 0) {
            for (const imageUrl of product.images) {
                const publicId = imageUrl.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(`product-images/${publicId}`);
            }
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, category, stock } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid Product ID' });
    }

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        if (name) product.name = name;
        if (description) product.description = description;
        if (price) product.price = price;
        if (category) product.category = category;
        if (stock) product.stock = stock;

        if (req.files && req.files.length > 0) {
            // Delete old images
            for (const imageUrl of product.images) {
                const publicId = imageUrl.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(`product-images/${publicId}`);
            }

            // Upload new images
            const newImageUrls = [];
            for (const file of req.files) {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: "product-images",
                });
                console.log("Cloudinary Result: ", result);
                newImageUrls.push(result.secure_url);
            }

            product.images = newImageUrls;
        }

        await product.save();

        res.status(200).json({
            message: 'Product updated successfully!',
            product,
        });
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