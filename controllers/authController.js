const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register a new user
exports.registerUser = async (req, res) => {
    const { name, email, password, age } = req.body;

    try {
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log(`User already exists with email: ${email}`);
            return res.status(400).json({ error: 'User already exists' });
        }

  
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(`Password hashed for user: ${email}`);

        
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            age,
        });
        console.log(`User created with ID: ${user._id}`);

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        console.error(`Error registering user: ${err.message}`);
        res.status(500).json({ error: err.message });
    }
};

// Login a user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            console.log(`User not found with email: ${email}`);
            return res.status(404).json({ error: 'User not found' });
        }

        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log(`Invalid password attempt for user: ${email}`);
            return res.status(401).json({ error: 'Invalid credentials' });
        }

       
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log(`JWT Token generated for user: ${email}`);

        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        console.error(`Error logging in user: ${err.message}`);
        res.status(500).json({ error: err.message });
    }
};
