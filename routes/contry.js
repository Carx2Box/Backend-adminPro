// Requires
const express = require('express');
const app = express();
const countryController = require('../controllers/country.controller');

//============ GetCountry By Code =========================
app.get('/:code', (req, res, next) => {
    countryController.getByCode(req, res)
        .then(response => res.status(response.status).json(response.result))
        .catch(err => res.status(response.status).json(err));
});



// Export module app.
module.exports = app;