const app = require('./app');
const math = require('./math');

math.add = jest.fn(() => 4);
math.subtract = jest.fn();

describe('Example test', () => {

    test("calls math.add", () => {
        expect(app.doAdd(1, 2)).toEqual(4);
        expect(math.add).toHaveBeenCalledWith(1, 2);
    });

    test("calls math.subtract", () => {
        app.doSubtract(1, 2);
        expect(math.subtract).toHaveBeenCalledWith(1, 2);
    });

});