const { User } = require("../models/db_schema");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {
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
        res.json({
             message: 'User registered successfully'
        });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
}

async function logInUser(req, res) {
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
        // Specify a secret key from an environmental variable
        const secretKey = process.env.TOKEN_SECRET;
        if (!secretKey) {
            throw new Error('JWT_SECRET environmental variable is not defined');
        }

        const token = jwt.sign(
            { _id: user._id, username: user.username }, // Include username in the token
            secretKey,
            { expiresIn: '1h' } 
        );
        res.json({ id: user._id, authToken: token, username: user.username }); // Send JSON response with token and username
        
    } catch (error) {
        res.status(500).json({ error: error.toString() }); // Send error details in JSON format
    }
}

module.exports = {
    registerUser,
    logInUser
}