const request = require('request');

class CountryController {}

CountryController.prototype.getByCode = (req) =>
    new Promise((resolve, reject) => {
        const code = req.params.code;

        request({ url: `https://restcountries.eu/rest/v2/alpha/${code}` }, (error, response, body) => {

            if (error) {
                resolve({ status: 500, result: { ok: false, message: 'Error loading country by code.', errors: error } });
            }

            if (response.statusCode == 200) {
                resolve({ status: 200, result: { ok: true, country: JSON.parse(response.body) } });
            }

            let message = JSON.parse(response.body).message;
            if (!message) {
                message = 'Internal Error';
            }
            resolve({ status: response.statusCode, result: { ok: false, message: message, errors: { message: message } } });
        });
    });


module.exports = new CountryController();