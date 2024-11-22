require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');


const analyticsRoutes = require('./routes/analyticsRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();


app.use(express.json());


connectDB();


app.use('/analytics', analyticsRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
