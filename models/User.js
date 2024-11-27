const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: { type: String, required: true },
    age: Number,
    createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model('User', userSchema);
