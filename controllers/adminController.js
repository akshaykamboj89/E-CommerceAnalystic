const Admin = require('../models/Admin');
const { generateToken } = require('../utils/jwtUtils');
const bcrypt=require('bcrypt')

exports.registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ error: 'Admin already exists' });
        }

        const admin = await Admin.create({ name, email, password });
        res.status(201).json({ message: 'Admin registered successfully', admin });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = generateToken({ id: admin._id });
        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
