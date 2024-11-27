const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Middleware for admin authentication
exports.authenticateAdmin = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await Admin.findById(decoded.id);
        if (!admin) throw new Error('Not authorized as admin');
        req.admin = admin;
        next();
    } catch (err) {
        res.status(403).json({ error: 'Invalid token' });
    }
};
