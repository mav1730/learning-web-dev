    const express = require('express');
    const PORT = 5000;
    const app = express();
    const cors = require('cors');
    const fs = require('fs');
const path = require('path');
    app.use(cors());
    app.use(express.json());

    // Logger Middleware
    app.use((req, res, next) => {
        console.log(`TIME: ${new Date().toISOString()} | METHOD: ${req.method} | URL: ${req.url}`);
        next();
    });

    // INITIALIZE DATABASE FROM FILE
    let users = [];
    try {
        
users = JSON.parse(fs.readFileSync(path.join(__dirname, 'users.json'), 'utf-8'));
        console.log(`>>> DATABASE LOADED: ${users.length} users online.`);
    } catch (err) {
        console.log(">>> ERROR: Could not read users.json. Starting empty.");
        users = [];
    }

    // HELPER FUNCTION TO SAVE DATA (Keeps code clean)
    const saveToDisk = () => {   
        fs.writeFileSync('./users.json', JSON.stringify(users, null, 2));
    };

    // --- ROUTES ---

    app.get('/api/v1/users', (req, res) => {
        res.status(200).json({ success: true, data: users });
    });

    app.post('/api/v1/users', (req, res) => {
        const newUser = { id: Date.now(), ...req.body };
        users.push(newUser);
        saveToDisk(); // Save the new list
        res.status(201).json(newUser);
    });

    app.put('/api/v1/users/:id', (req, res) => {
        const id = Number(req.params.id);
        const userindex = users.findIndex((u) => u.id === id);

        if (userindex === -1) return res.status(404).json({ message: "ID NOT FOUND" });

        users[userindex] = { ...users[userindex], ...req.body };
        saveToDisk(); // Save the update
        res.status(200).json({ success: true, data: users[userindex] });
    });

    app.delete('/api/v1/users/:id', (req, res) => {
        const id = Number(req.params.id);
        const userExists = users.some(u => u.id === id);

        if (!userExists) return res.status(404).json({ message: "Not found" });

        users = users.filter((u) => u.id !== id);
        saveToDisk(); // Save the deletion
        res.status(200).json({ message: `User ${id} deleted.` });
    });

    app.listen(PORT, () => console.log("SYSTEMS ONLINE BOSS"));