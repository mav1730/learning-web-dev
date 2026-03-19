const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`>>> [DATABASE] Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`>>> [ERROR] ${err.message}`);
        process.exit(1); // Kill the server if DB fails
    }
};

module.exports = connectDB;