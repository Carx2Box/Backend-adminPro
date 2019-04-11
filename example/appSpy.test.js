const app = require('./app');
const math = require('./math');


describe('Example test', () => {
    test("calls math.add", () => {
        //const addMock = jest.spyOn(math, "add").mockReturnValue(3);

        //const addMock = jest.spyOn(math, "add").mockReturnValue(3);

        // calls the original implementation
        expect(app.doAdd(1, 2)).toEqual(4);

        // and the spy stores the calls to add
        expect(addMock).toHaveBeenCalledWith(1, 2);
    });

});