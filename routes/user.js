// Requires
const express = require('express');
const app = express();
const User = require('../models/user');

// Routes 
app.get('/', function(req, res, next) {

    // field to show
    User.find({}, 'name email img rol')
        .exec(
            (err, data) => {

                if (err) {
                    res.status(500).json({
                        ok: false,
                        mensaje: 'Error loading users.',
                        errors: err
                    });

                    return;
                }

                res.status(200).json({
                    ok: true,
                    usuarios: data
                });
            });
});

// Export module app.
module.exports = app;