// Requires
const express = require('express');
const app = express();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const mdAuthentication = require('../middlewares/authentication');

//=====================================
// Get Users
//=====================================
app.get('/', function(req, res, next) {

    let fromRows = req.query.fromRows || 0;
    fromRows = Number(fromRows);

    // field to show
    User.find({}, 'name email img rol')
        .skip(fromRows)
        .limit(5)
        .exec(
            (err, data) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error loading users.',
                        errors: err
                    });
                }

                User.count({}, (err, count) => {
                    res.status(200).json({
                        ok: true,
                        rows: count,
                        usuarios: data
                    });
                });
            });
});

//=====================================
// Update user
//=====================================

app.put('/:id', [mdAuthentication.verifyToken], (req, res, next) => {

    const body = req.body;
    const id = req.params.id;

    User.findById(id, (err, user) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error get user.',
                errors: err
            });
        }

        if (!user) {
            return res.status(400).json({
                ok: false,
                mensaje: 'The user with id' + id + ' no exists.',
                errors: { message: 'No exists user with this Id' }
            });
        }

        user.name = body.name;
        user.email = body.email;
        user.role = body.role;

        user.save((err, userSave) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error to update user.',
                    errors: err
                });
            }

            userSave.password = '.';

            res.status(200).json({
                ok: true,
                user: userSave,
                usertoken: req.user
            });
        });
    });
});

//=====================================
// Add new user
//=====================================

app.post('/', (req, res, next) => {
    const body = req.body;

    var user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    });

    user.save((err, userSave) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error to create user.',
                errors: err
            });
        }

        userSave.password = '.';
        res.status(201).json({
            ok: true,
            user: userSave,
            usertoken: req.user
        });
    });
});

//=====================================
// Delete user
//=====================================
app.delete('/:id', [mdAuthentication.verifyToken], (req, res, next) => {
    const id = req.params.id;

    User.findByIdAndDelete(id, (err, userDeleted) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error to delete user.',
                errors: err
            });
        }

        userDeleted.password = '.';
        res.status(200).json({
            ok: true,
            body: userDeleted
        });

    });
});

// Export module app.
module.exports = app;