// Requires
const express = require('express');
const mongoose = require('mongoose');

// Initialize vars
const app = express();

// Connection to database
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {
    if (err) throw err;

    console.log('Database \x1b[32m%s\x1b[0m', 'online');
});

// Get 
app.get('/', function(req, res, next) {

    res
        .status(200)
        .json({
            ok: true,
            mensaje: 'Petición realizada correctamente.'
        });
});

app.listen(3000, () => {
    console.log('Server express http://localhost:3000: \x1b[32m%s\x1b[0m', 'online');
});