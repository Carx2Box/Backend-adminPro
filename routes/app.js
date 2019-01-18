// Requires
const express = require('express');
const app = express();

// Routes 
app.get('/', function(req, res, next) {

    res
        .status(200)
        .json({
            ok: true,
            message: 'Petición realizada correctamente.'
        });
});

// Export module app.
module.exports = app;