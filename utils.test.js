var validationCollection = require('./utils');

describe('Utils test', () => {

    test('It valid value with users type collection', () => {
        expect(validationCollection('users')).toBe(true);
    });

    test('It valid value with doctors type collection', () => {
        expect(validationCollection('doctors')).toBe(true);
    });

    test('It valid value with doctors type collection', () => {
        expect(validationCollection('hospitals')).toBe(true);
    });

    test('It valid value with undefined type collection', () => {
        expect(validationCollection(undefined)).toBe(false);
    });

    test('It valid value with null type collection', () => {
        expect(validationCollection(undefined)).toBe(false);
    });

});