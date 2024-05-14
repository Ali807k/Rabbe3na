const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'config', '.env') });
const express = require('express');
const app = express();
const http = require('http').Server(app);
const cors = require('cors');
const nunjucks = require('nunjucks');
const chat_controller = require('./controllers/chat_controller');

const userRouter = require('./routes/users');
const jalsahRouter = require('./routes/jalsaat');
const chatRouter = require('./routes/chats');
const emailRouter = require('./routes/email')

const io = require('socket.io')(http);

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
app.use('/api/chats', chatRouter);


// Handle incoming connections from clients
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chat message', (msg) => {
        chat_controller.saveChatMessage(msg, io);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});
app.use('/api/email', emailRouter);

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
http.listen(PORT, () => console.log(`Listening on port ${PORT}`));
