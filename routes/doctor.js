// Requires
const express = require('express');
const app = express();

const mdAuthentication = require('../middlewares/authentication');
const doctorController = require('../controllers/doctor.controller');

//================= GetById =============================
app.get('/:id', doctorController.getById);
//================= GetAll ==============================
app.get('/', doctorController.getAll);
//================= Add =================================
app.post('/', [mdAuthentication.verifyToken], doctorController.add);
//================= Update ==============================
app.put('/:id', [mdAuthentication.verifyToken], doctorController.update);
//================= Delete ==============================
app.delete('/:id', [mdAuthentication.verifyToken], doctorController.delete);

// Export module app.
module.exports = app;