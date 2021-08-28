const express = require('express');
const connectDB = require('./config/db');

// create server
const app = express();

//connecta database
connectDB();

//app port
const PORT = process.env.PORT || 4000;

//start server
app.listen(PORT, () => {
    console.log(`Server on port: ${PORT}`);
})