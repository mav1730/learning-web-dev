require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authroute');

const app = express();
app.use(express.json());

// Connect Database
connectDB();

// Use Routes
app.use('/api/v1/auth', authRoutes);

// Protected Route Example
const { protect } = require('./middleware/authmiddleware');
app.get('/api/v1/auth/me', protect, (req, res) => {
    res.json({ success: true, user: req.user });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));