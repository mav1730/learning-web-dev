// 1. THE FOUNDATION
require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// 2. THE VAULT CONNECTION
// TODO: Fill in the connection string using process.env
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log(">>> [SUCCESS] Vault Connected."))
    .catch(err => console.log(">>> [ERROR] Connection Failed:", err.message));

// 3. THE BLUEPRINT (Schema)
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        // TODO: What property goes here to prevent duplicate accounts?
        unique : true 
    },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// 4. THE SIGNUP LOGIC (The Scramble)
app.post('/api/v1/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // TODO: Use bcrypt to scramble the password 
        // Hint: Generate a salt first, then hash it.
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword 
        });
        res.status(201).json({ success: true, message: "User created in Vault" });
        console.log(`NEW USER JUST SIGNED UP: ${newUser}`)
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.post('/api/v1/login',async(req,res)=>{
    try{
        const {email,password} = req.body
        const user = await User.findOne({email})
        if (!user || !(await bcrypt.hash(password, user.password))) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign(
            { id: user._id },    // The Payload
            process.env.JWT_SECRET,     // The Secret from your .env
            { expiresIn: '1h' }  // The Expiry
        );

        res.json({ success: true, token });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.get(('/'),(req,res)=>{
    res.send("HELLO BOSS ALL GOOD ")
    console.log(`${req.method} is done on ${req.url}`)
})

// THE BOUNCER (Protect Middleware)
const protect = async (req, res, next) => {
    let token;

    // 1. Check headers for "Authorization" and "Bearer"
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // 2. Split the string to get the token only
            token = req.headers.authorization.split(' ')[1];

            // 3. Verify the "Passport"
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 4. Find user and attach to the request (req.user)
            req.user = await User.findById(decoded.id).select('-password');

            next(); // 5. What function do you call to let them through?
        } catch (error) {
            res.status(401).json({ message: "Invalid Token" });
        }
    }

    if (!token) {
        res.status(401).json({ message: "No token, no entry!" });
    }
};

// --- TEST THE BOUNCER ---
app.get('/api/v1/me', protect, (req, res) => {
    res.json({
        message: "You are inside the Vault!",
        user: req.user
    });
});

// 5. START THE ENGINE
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));