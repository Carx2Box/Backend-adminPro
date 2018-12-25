// Requires
const express = require('express');
const app = express();
const Hospital = require('../models/hospital');
const mdAuthentication = require('../middlewares/authentication');

//=====================================
// Get Hospitals
//=====================================
app.get('/', function(req, res, next) {

    let fromRows = req.query.fromRows || 0;
    fromRows = Number(fromRows);

    // field to show
    Hospital.find({})
        .skip(fromRows)
        .limit(5)
        .populate('user', "name email")
        .exec((err, hospitals) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error loading hospitals.',
                    errors: err
                });
            }

            Hospital.count({}, (err, count) => {
                res.status(200).json({
                    ok: true,
                    rows: count,
                    hospitals: hospitals
                });
            });
        });
});

//=====================================
// Add new hospital
//=====================================

app.post('/', [mdAuthentication.verifyToken], (req, res, next) => {
    const body = req.body;

    var hospital = new Hospital({
        name: body.name,
        user: req.user._id
    });

    hospital.save((err, hospitalSave) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error to create a hospital.',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            hospital: hospitalSave,
            usertoken: req.user
        });
    });
});

//=====================================
// Update hospital
//=====================================

app.put('/:id', [mdAuthentication.verifyToken], (req, res, next) => {

    const body = req.body;
    const id = req.params.id;

    Hospital.findById(id, (err, hospital) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error get hospital.',
                errors: err
            });
        }

        if (!hospital) {
            return res.status(400).json({
                ok: false,
                mensaje: 'The hospital with id' + id + ' no exists.',
                errors: { message: 'No exists hospital with this Id' }
            });
        }

        hospital.name = body.name;
        hospital.user = req.user._id;

        hospital.save((err, hospitalSaved) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error to update hospital.',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                hospital: hospitalSaved,
                usertoken: req.user
            });
        });
    });
});

//=====================================
// Delete hospital
//=====================================
app.delete('/:id', [mdAuthentication.verifyToken], (req, res, next) => {
    const id = req.params.id;

    Hospital.findByIdAndDelete(id, (err, hospitalDeleted) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error to delete hospital.',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            body: hospitalDeleted
        });

    });
});

// Export module app.
module.exports = app;