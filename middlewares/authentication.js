const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const seed = require('../config/config').SEED;
const adminRole = require('../config/config').ADMIN_ROLE;

//=====================================
// Check token JWT
//=====================================
exports.verifyToken = function(req, res, next) {
    const token = req.query.token;
    jwt.verify(token, seed, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                message: 'Invalid token.',
                errors: err
            });
        }

        req.user = decoded.user;
        next();
    });
};

//=====================================
// Check Admin role or same user
//=====================================
exports.verifyAdminRoleOrSameUser = function(req, res, next) {

    const id = req.params.id;

    // the same user 
    if (id && id === req.user._id) {
        next();
        return;
    }

    // only Admin Role
    if (req.user.role === adminRole) {
        next();
        return;
    }

    return res.status(401).json({
        ok: false,
        message: 'Token incorrect.',
        errors: { message: 'Token incorrect.' }
    });
};