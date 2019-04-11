const sinon = require('sinon');
const Controller = require('./country.controller');
const request = require('request');

describe('Contry Controller', () => {
    let req = {};
    let data = {
        "name": "Spain",
        "topLevelDomain": [
            ".es"
        ],
        "alpha2Code": "ES",
        "alpha3Code": "ESP",
        "callingCodes": [
            "34"
        ],
        "capital": "Madrid",
        "altSpellings": [
            "ES",
            "Kingdom of Spain",
            "Reino de España"
        ],
        "region": "Europe",
        "subregion": "Southern Europe",
        "population": 46438422,
        "latlng": [
            40, -4
        ],
        "demonym": "Spanish",
        "area": 505992,
        "gini": 34.7,
        "timezones": [
            "UTC",
            "UTC+01:00"
        ],
        "borders": [
            "AND",
            "FRA",
            "GIB",
            "PRT",
            "MAR"
        ],
        "nativeName": "España",
        "numericCode": "724",
        "currencies": [{
            "code": "EUR",
            "name": "Euro",
            "symbol": "€"
        }],
        "languages": [{
            "iso639_1": "es",
            "iso639_2": "spa",
            "name": "Spanish",
            "nativeName": "Español"
        }],
        "translations": {
            "de": "Spanien",
            "es": "España",
            "fr": "Espagne",
            "ja": "スペイン",
            "it": "Spagna",
            "br": "Espanha",
            "pt": "Espanha",
            "nl": "Spanje",
            "hr": "Španjolska",
            "fa": "اسپانیا"
        },
        "flag": "https://restcountries.eu/data/esp.svg",
        "regionalBlocs": [{
            "acronym": "EU",
            "name": "European Union",
            "otherAcronyms": [],
            "otherNames": []
        }],
        "cioc": "ESP"
    };
    error = new Error({ message: "blah blah" });

    describe('when stubbed', () => {

        let stub;

        beforeEach(function() {
            stub = sinon.stub(request, 'get');
        });

        afterEach(function() {
            request.get.restore();
        });

        test('GET /country/:code ok', function(done) {

            req = { params: { code: "es" } };

            const responseObject = {
                statusCode: 200,
                body: JSON.stringify(data),
                headers: {
                    'content-type': 'application/json'
                }
            };

            stub.yields(null, responseObject, JSON.stringify(data));

            Controller.getByCode(req).then(result => {

                expect(result.status).toBe(200);
                expect(result.result.ok).toBe(true);
                expect(result.result.country).toBeTruthy();
                done();

            });
        });

        test('GET /country/:code err', function(done) {

            req = { params: { code: "pt" } };

            const responseObject = {
                statusCode: 500,
            };

            stub.yields(error, responseObject, null);

            Controller.getByCode(req).then((result) => {

                console.log(result);
                expect(result.status).toBe(500);
                expect(result.result.ok).toBe(false);
                expect(result.result.country).toBeFalsy();
                done();
            });
        });
    });
});