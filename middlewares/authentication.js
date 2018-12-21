const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const seed = require('../config/config').SEED;

//=====================================
// Verificar token
//=====================================
exports.verifyToken = function(req, res, next) {
    const token = req.query.token;
    jwt.verify(token, seed, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Invalid token.',
                errors: err
            });
        }

        req.user = decoded;
        next();
    });
};