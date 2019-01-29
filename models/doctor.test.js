// Required
const mongooge = require('mongoose');
const Schema = mongooge.Schema;
const Doctor = require('./doctor');

describe('Doctor test', () => {

    test('should be invalid if name is empty', (done) => {
        const doctor = new Doctor();
        doctor.name = "";
        doctor.validate((error) => {
            expect(error.errors.name).toBeTruthy();
            done();
        });
    });

    test('should be valid if img is empty', (done) => {
        const doctor = new Doctor();
        doctor.name = "";
        doctor.validate((error) => {
            expect(error.errors.img).toBeFalsy();
            done();
        });
    });

    test('should be valid if user is empty', (done) => {
        const doctor = new Doctor();
        doctor.name = "";
        doctor.validate((error) => {
            expect(error.errors.user).toBeFalsy();
            done();
        });
    });

    test('should be invalid if hospital is empty', (done) => {
        const doctor = new Doctor();
        doctor.name = "";
        doctor.validate((error) => {
            expect(error.errors.hospital).toBeTruthy();
            done();
        });
    });

});