// Requires
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

var app = express();

// Import routes
var appRoutes = require('./routes/app');
var userRoutes = require('./routes/user');
var loginRoutes = require('./routes/login');

// Connection to database
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {
    if (err) throw err;

    console.log('Database \x1b[32m%s\x1b[0m', 'online');
});

app
// Body parser
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    // Use routes
    .use('/login', loginRoutes)
    .use('/user', userRoutes)
    .use('/', appRoutes);

app.listen(3000, () => {
    console.log('Server express http://localhost:3000: \x1b[32m%s\x1b[0m', 'online');
});