const express = require('express');
const validateCollection = require('../utils');
const app = express();

//=====================================
// Validate valid collection in the url
//=====================================
exports.valideCollection = function(req, res, next) {
    const type = req.params.type;

    if (!validateCollection(type)) {
        return res.status(500).json({
            ok: false,
            message: 'Type of collection is not valid',
            errors: { message: 'Incorrect type of collection (allowed doctors, hospitals and users)' }
        });
    }

    next();
};