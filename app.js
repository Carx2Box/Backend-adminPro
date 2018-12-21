// Requires
const express = require('express');
const mongoose = require('mongoose');

var app = express();

// Import routes
var appRoutes = require('./routes/app');
var userRoutes = require('./routes/user');

// Connection to database
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {
    if (err) throw err;

    console.log('Database \x1b[32m%s\x1b[0m', 'online');
});

// Use the routes.
app.use('/user', userRoutes);
app.use('/', appRoutes);

app.listen(3000, () => {
    console.log('Server express http://localhost:3000: \x1b[32m%s\x1b[0m', 'online');
});