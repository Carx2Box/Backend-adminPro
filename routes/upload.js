// Requires
const express = require('express');
const fileUpload = require('express-fileupload');
const uidGenerator = require('node-unique-id-generator');
const fs = require('fs');
const mdCollectionValidator = require('../middlewares/collectionvalidator');


const app = express();

const User = require('../models/user');
const Hospital = require('../models/hospital');
const Doctor = require('../models/doctor');

// Routes 
app.use(fileUpload());

app.put('/:type/:id', [mdCollectionValidator.valideCollection], function(req, res, next) {

    const type = req.params.type;
    const userId = req.params.id;
    const response = res;

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            message: 'No files were uploaded',
            errors: { message: 'You must selected an image' }
        });
    }

    let uploadFile = req.files.image;
    let splitFileName = uploadFile.name.split('.');
    const extension = splitFileName[splitFileName.length - 1];

    // Validate extension file
    let validExtensions = ['jpg', 'png', 'gif', 'jpeg'];
    if (!validExtensions.includes(extension)) {
        return res.status(500).json({
            ok: false,
            message: 'Extension is not valid',
            errors: { message: 'Incorrect type of image (allowed jpg, png, gif, jpeg)' }
        });
    }

    const nameFile = `${userId}-${ replaceAll(uidGenerator.generateGUID(),'-','') }.${extension}`;
    const pathFile = `./assets/${type}/${nameFile}`;

    uploadFile.mv(pathFile, function(err) {
        if (err)
            return res.status(500).json({
                ok: false,
                message: 'Error to move the image',
                errors: err
            });

        uploadForType(type, userId, nameFile, response);
    });
});

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function uploadForType(type, id, nameFile, res) {
    if (type === 'users') {

        User.findById(id, (err, user) => {
            var oldPath = './assets/users/' + user.img;

            if (!user) {
                res.status(400).json({
                    ok: true,
                    message: 'User no exists',
                    errors: { message: 'User no exists' }
                });
            }

            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }

            user.img = nameFile;
            user.save((err, updatedUser) => {
                updatedUser.password = '.';

                res.status(201).json({
                    ok: true,
                    message: 'Image user update sucessfully',
                    user: updatedUser
                });
            });
        });

        return;
    }

    if (type === 'doctors') {
        Doctor.findById(id, (err, doctor) => {
            var oldPath = './assets/doctors/' + doctor.img;

            if (!doctor) {
                res.status(400).json({
                    ok: true,
                    message: 'Doctor no exists',
                    errors: { message: 'Doctor no exists' }
                });
            }

            if (doctor.img !== '') {
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }

            doctor.img = nameFile;
            doctor.save((err, updatedDoctor) => {

                res.status(201).json({
                    ok: true,
                    message: 'Image doctor update sucessfully',
                    doctor: updatedDoctor
                });
            });
        });

        return;
    }

    if (type === 'hospitals') {
        Hospital.findById(id, (err, hospital) => {
            var oldPath = './assets/hospitals/' + hospital.img;

            if (!hospital) {
                res.status(400).json({
                    ok: true,
                    message: 'Hospital no exists',
                    errors: { message: 'Hospital no exists' }
                });
            }

            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }

            hospital.img = nameFile;
            hospital.save((err, updatedhospital) => {
                res.status(201).json({
                    ok: true,
                    message: 'Image hospital update sucessfully',
                    hospital: updatedhospital
                });
            });
        });
    }

}

// Export module app.
module.exports = app;