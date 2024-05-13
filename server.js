<<<<<<< HEAD
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'config', '.env') });
const express = require('express');
const cors = require('cors');
const nunjucks = require('nunjucks')

const userRouter = require('./routes/users');
const jalsahRouter = require('./routes/jalsaat')

const app = express();
=======
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose"); // for mongoDB
const cors = require("cors"); // for cross-origin requests
const path = require("path");
const app = express();
app.use(
  cors({
    origin: "http://127.0.0.1:5501", // Allow your frontend's origin
  })
);
>>>>>>> e43df6ed1a6dad2cad895b46dee03f3021981926

nunjucks.configure("views", {
   autoescape: true,
   express: app,
});
   
app.set("view engine", "njk"); 

app.use(cors());
app.use(express.json());
<<<<<<< HEAD
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

 
app.use('/api/users', userRouter);
app.use('/api/jalsaat', jalsahRouter);

// Define a single route handler for all pages
app.get('/:page', (req, res) => {
   const { page } = req.params;
   // Render the corresponding page based on the route parameter
   res.render(`${page}.njk`);
});  
app.get('/', (req, res) => {
   res.render(`index.njk`);
});
  
const PORT = 3000
app.listen(PORT, function() {
   console.log(`Listening on port ${PORT}...`);
});
=======
// Routes
const userRoutes = require("./routes/users");

// Middleware
// for parsing application/json
app.use("/api/users", userRoutes); // Set the base path for all routes in users.js
app.use("/Home_Page", express.static(path.join(__dirname, "Home_Page")));
app.use(
  "/Sign-In&Register_Page",
  express.static(path.join(__dirname, "Sign-In&Register_Page"))
);
const jalsahRouter = require("./routes/jalsah");
app.use(
  "/Sessions_Page",
  express.static(path.join(__dirname, "Sessions_Page"))
);
app.use("/api/jalsah", jalsahRouter); // This should match the directory and file name correctly

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
>>>>>>> e43df6ed1a6dad2cad895b46dee03f3021981926
