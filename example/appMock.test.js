const app = require('./app');
const math = require('./math');

jest.mock("./math.js");

describe('Example test', () => {

    test("calls math.add", () => {
        app.doAdd(1, 2);
        expect(math.add).toHaveBeenCalledWith(1, 2);
    });

    test("calls math.subtract", () => {
        app.doSubtract(1, 2);
        expect(math.subtract).toHaveBeenCalledWith(1, 2);
    });

});