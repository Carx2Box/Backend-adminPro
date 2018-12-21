// Requires
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const seed = require('../config/config').SEED;

const app = express();
const User = require('../models/user');

app.post('/', (req, res, next) => {

    const body = req.body;

    User.findOne({ email: body.email }, (err, userDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Incorrect credentials',
                errors: err
            });
        }

        if (!bcrypt.compareSync(body.password, userDB.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Incorrect credentials',
                errors: err
            });
        }

        userDB.password = '.';
        var token = jwt.sign({ user: userDB }, seed, { expiresIn: 14400 });
        res.status(200).json({
            ok: true,
            user: userDB,
            id: userDB._id,
            token: token
        });
    });
});

// Export module app.
module.exports = app;