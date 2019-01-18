// Requires
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const seed = require('../config/config').SEED;
const app = express();
const User = require('../models/user');

// Google
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(require('../config/config').CLIENT_ID);

// /// Authentication of  Google
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: require('../config/config').CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    // If request specified a G Suite domain:
    //const domain = payload['hd'];

    return {
        name: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true,
        payload
    };
}

app.post('/google', async(req, res, next) => {

    const token = req.body.token;
    var googleUser = await verify(token)
        .catch(err => {
            return res.status(403).json({
                ok: true,
                message: 'Invalid token'
            });
        }).then((usr) => {

            User.findOne({ email: usr.email }, (err, userDB) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al buscar usuario',
                        errors: err
                    });
                }

                if (userDB) {
                    if (userDB.google === false) {
                        return res.status(400).json({
                            ok: false,
                            mensaje: 'Must be the authentication normal',
                            errors: err
                        });
                    } else {
                        var token = jwt.sign({ user: userDB }, seed, { expiresIn: 14400 });
                        res.status(200).json({
                            ok: true,
                            user: userDB,
                            id: userDB._id,
                            token: token,
                            menu: GetMenu(userDB.role)
                        });
                    }
                } else {
                    // user no exists then create one..
                    const usuario = new User();
                    usuario.name = usr.name;
                    usuario.email = usr.email;
                    usuario.img = usr.img;
                    usuario.password = '.';
                    usuario.google = true;

                    usuario.save((err, usuario) => {
                        var token = jwt.sign({ user: usuario }, seed, { expiresIn: 14400 });
                        res.status(200).json({
                            ok: true,
                            user: usuario,
                            id: usuario._id,
                            token: token,
                            menu: GetMenu(usuario.role)
                        });

                    });
                }
            });
        });
});

/// Authentication normal
app.post('/', (req, res, next) => {

    const body = req.body;

    User.findOne({ email: body.email }, (err, userDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Incorrect credentials',
                errors: err
            });
        }

        if (!bcrypt.compareSync(body.password, userDB.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Incorrect credentials',
                errors: err
            });
        }

        userDB.password = '.';
        var token = jwt.sign({ user: userDB }, seed, { expiresIn: 14400 });
        res.status(200).json({
            ok: true,
            user: userDB,
            id: userDB._id,
            token: token,
            menu: GetMenu(userDB.role)
        });
    });
});


function GetMenu(role) {

    const administrationIndex = 1;
    const menu = [{
            titulo: 'Principal',
            icono: 'mdi mdi-gauge',
            submenu: [
                { titulo: 'Dashboard', url: '/dashboard' },
                { titulo: 'ProgressBar', url: '/progress' },
                { titulo: 'Graphics', url: '/graphics1' },
                { titulo: 'Promises', url: '/promises' },
                { titulo: 'RxJs', url: '/rxjs' }
            ]
        },
        {
            titulo: 'Administration',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [
                { titulo: 'Hospitals', url: '/hospitals' },
                { titulo: 'Doctors', url: '/doctors' }
            ]
        }
    ];

    if (role === 'ADMIN_ROLE') {
        menu[administrationIndex].submenu.unshift({ titulo: 'Users', url: '/users' });
    }


    return menu;
}

// Export module app.
module.exports = app;