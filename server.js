const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'config', '.env') });
const express = require('express');
const cors = require('cors');
const nunjucks = require('nunjucks')

const userRouter = require('./routes/users');
const jalsahRouter = require('./routes/jalsaat')

const app = express();

nunjucks.configure("views", {
   autoescape: true,
   express: app,
});
   
app.set("view engine", "njk"); 

app.use(cors());
app.use(express.json());
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