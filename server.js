require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose'); // for mongoDB

const app = express();


const userRoutes = require('./routes/users');

// Middleware
app.use(express.json()); // for parsing application/json
app.use('/api/users', userRoutes); // Set the base path for all routes in users.js

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

