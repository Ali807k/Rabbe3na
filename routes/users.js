// users.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// POST route for user registration
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        await newUser.save();
        res.json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
        
    }
});

// POST route for user login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // Use .json() to send JSON response
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' }); // Use .json() to send JSON response
        }

        const token = jwt.sign(
            { _id: user._id, username: user.username }, // Include username in the token
            process.env.TOKEN_SECRET,
            { expiresIn: '1h' }
        );
        res.json({ authToken: token, username: user.username }); // Send JSON response with token and username
        
    } catch (error) {
        res.status(500).json({ error: error.toString() }); // Send error details in JSON format
    }
});

module.exports = router;
