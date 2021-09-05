const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// create server
const app = express();

//connecta database
connectDB();

//enable cors
app.use(cors());

//enable express.json
app.use(express.json({extended: true}));

//app port
const PORT = process.env.PORT || 4000;

//Import routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/projects',require('./routes/projects'));
app.use('/api/tasks',require('./routes/tasks'));


//start server
app.listen(PORT, () => {
    console.log(`Server on port: ${PORT}`);
})