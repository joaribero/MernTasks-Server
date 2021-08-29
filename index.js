const express = require('express');
const connectDB = require('./config/db');

// create server
const app = express();

//connecta database
connectDB();

//enable express.json
app.use(express.json({extended: true}));

//app port
const PORT = process.env.PORT || 4000;

//Import routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth',require('./routes/auth'));

//start server
app.listen(PORT, () => {
    console.log(`Server on port: ${PORT}`);
})