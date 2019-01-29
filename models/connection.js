const mongoose = require('mongoose');
const config = require('../config/config');

module.exports = {
    mongoose,
    connect: () => {

        return new Promise((resolve, reject) => {

            mongoose.connection.openUri(config.CONNECTION_DATABASE, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true)
                }
            });
        });
    },
    disconnect: (done) => {
        mongoose.disconnect(done);
    },
};