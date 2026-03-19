require('dotenv').config();
console.log("--- ENV DIAGNOSTICS ---");
console.log("PORT:", process.env.PORT);
console.log("MONGO:", process.env.MONGO_URI ? "LOADED" : "MISSING");
console.log("SECRET:", process.env.JWT_SECRET ? "LOADED" : "MISSING");
console.log("-----------------------");
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken')
const app = express();

// 1. MIDDLEWARE

app.use(express.json());

// 2. DATABASE CONNECTION (With Safety Fallback)
const DB_URI = process.env.MONGO_URI || "mongodb://localhost:27017/sleeper_build";

mongoose.connect(DB_URI)
    .then(() => console.log(">>> [SUCCESS] Database Vault is LIVE."))
    .catch((err) => console.log(">>> [ERROR] Database connection failed:", err.message));

// 3. USER SCHEMA (The Blueprint)
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "Intern" },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// 4. --- ROUTES ---
// Add this below your Signup route
app.get('/api/v1/auth/users', async (req, res) => {
    const allUsers = await User.find(); // This tells MongoDB: "Give me everything"
    res.json(allUsers);
});
// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ status: "Online", db: "Connected" });
});


// SIGNUP ROUTE (The Auth Entry Point)
app.post('/api/v1/auth/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already registered." });

        // HASH THE PASSWORD (The Security Move)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save to MongoDB
        const newUser = new User({
            name,
            email,
            password: hashedPassword // Saving the scrambled version
        });

        await newUser.save();
        res.status(201).json({ message: "User Created Successfully", user: { name, email } });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/v1/auth/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ message: "User not found" });

        //2.checking password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // 3. Create the JWT (The Wristband)
        const token = jwt.sign(
            { id: user._id, role: user.role }, // Payload
            process.env.JWT_SECRET,            // Your secret key from .env
            { expiresIn: '1h' }                // Token dies in 1 hour
        );

        res.json({
            success: true,
            token, // The user will save this in their browser/app
            message: `Welcome back, ${user.name}`
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})



// 5. IGNITION
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`>>> [SYSTEM] Server roaring on Port ${PORT}`);
})