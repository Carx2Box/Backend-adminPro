// Requires
const express = require('express');
const app = express();
const Hospital = require('../models/hospital');
const User = require('../models/user');
const Doctor = require('../models/doctor');

//=====================================
// Get for collection entities
//=====================================
app.get('/collection/:table/:search', function(req, res, next) {

    var table = req.params.table;
    var searcher = req.params.search;
    var regex = new RegExp(searcher, 'i');
    var promise;

    switch (table) {
        case 'users':
            promise = searchUsers(searcher, regex);
            break;
        case 'hospitals':
            promise = searchHospitals(searcher, regex);
            break;
        case 'doctors':
            promise = searchDoctors(searcher, regex);
            break;

        default:
            return res.status(400).json({
                ok: false,
                //message: 'The valid types are: users, hospitals and doctors',
                error: `Type_Data/colección no valido`
            });
    }

    promise.then((data) => {
        return res.status(200).json({
            ok: true,
            [table]: data
        });
    });
});

//=====================================
// Get all entities
//=====================================
app.get('/all/:search', function(req, res, next) {

    var searcher = req.params.search;
    var regex = new RegExp(searcher, 'i');

    Promise.all([
            searchHospitals(searcher, regex),
            searchDoctors(searcher, regex),
            searchUsers(searcher, regex)
        ])
        .then((responses) => {

            const hospitalIndex = 0;
            const doctorsIndex = 1;
            const usersIndex = 2;

            res.status(200).json({
                ok: true,
                hospitals: responses[hospitalIndex],
                doctors: responses[doctorsIndex],
                users: responses[usersIndex]
            });
        });
});


function searchUsers(searcher, regex) {

    return new Promise((resolve, reject) => {
        User.find({}, 'name email role')
            .or([{ name: regex }, { email: searcher }])
            .exec((err, users) => {
                if (err) {
                    reject('Error to load users', err);
                } else {
                    resolve(users);
                }
            });
    });
}

function searchDoctors(searcher, regex) {

    return new Promise((resolve, reject) => {
        Doctor.find({ name: regex })
            .populate('user', 'name email')
            .populate('hospital')
            .exec((err, doctors) => {
                if (err) {
                    reject('Error to load doctors', err);
                } else {
                    resolve(doctors);
                }
            });
    });
}

function searchHospitals(searcher, regex) {

    return new Promise((resolve, reject) => {
        Hospital.find({ name: regex })
            .populate('user', 'name email')
            .exec((err, hospitals) => {
                if (err) {
                    reject('Error to load hospitales', err);
                } else {
                    resolve(hospitals);
                }
            });
    });
}


// Export module app.
module.exports = app;