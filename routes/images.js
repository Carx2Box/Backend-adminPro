// Requires
const express = require('express');
const mdCollectionValidator = require('../middlewares/collectionvalidator');
const app = express();

const path = require('path');
const fs = require('fs');
const validCollection = require('../utils');


// Routes 
app.get('/:type/:img', [mdCollectionValidator.valideCollection], function(req, res, next) {

    const type = req.params.type;
    const img = req.params.img;
    const pathImage = path.resolve(__dirname, `../assets/${type}/${img}`);

    if (!fs.existsSync(pathImage)) {
        const pathNoImage = path.resolve(__dirname, `../assets/no-img.jpg`);
        return res.sendFile(pathNoImage);
    }

    res.sendFile(pathImage);
});

// Export module app.
module.exports = app;