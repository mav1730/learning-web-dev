const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'intern' } // Added for Day 13!
}, { 
    timestamps: true // This adds 'createdAt' and 'updatedAt' automatically
});

module.exports = mongoose.model('User', userSchema);