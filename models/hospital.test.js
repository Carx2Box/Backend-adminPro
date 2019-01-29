// Required
const Hospital = require('./hospital');
const mongooge = require('mongoose');
const Schema = mongooge.Schema;

describe('Hospital model test', () => {

    test('should be invalid if name is empty', (done) => {
        const hospital = new Hospital();
        hospital.validate((error) => {
            expect(error.errors.name).toBeTruthy();
            done();
        });
    });

    test('should be valid if img is empty', (done) => {
        const hospital = new Hospital();
        hospital.validate((error) => {
            expect(error.errors.img).toBeFalsy();
            done();
        });
    });

    test('should be valid if user is empty', (done) => {
        const hospital = new Hospital();
        hospital.validate((error) => {
            expect(error.errors.user).toBeFalsy();
            done();
        });
    });
});