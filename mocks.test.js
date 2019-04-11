function foo() {
    return 1;
}

function fetchData(callback) {
    callback(1);
}

function CalledMethod(arg) {
    if (arg === 1) {
        return foo();
    }
}

const doAdd = (a, b, callback) => {
    callback(a + b);
};

// Capturar llamadas al argumento.
test("calls callback with arguments added", () => {
    const mockCallback = jest.fn();
    doAdd(1, 2, mockCallback);
    expect(mockCallback).toHaveBeenCalledWith(3);
});


describe('Mock test', () => {

    test('the data is peanut butter', done => {
        function callback(data) {
            expect(data).toBe(2);
            done();
        }

        fetchData(callback);
    });

    test("returns undefined by default", () => {
        const mock = jest.fn();

        let result = mock("foo");

        expect(result).toBeUndefined();
        expect(mock).toHaveBeenCalled();
        expect(mock).toHaveBeenCalledTimes(1);
        expect(mock).toHaveBeenCalledWith("foo");
    });

    test("mock implementation", () => {
        const mock = jest.fn(() => "bar");

        expect(mock("foo")).toBe("bar");
        expect(mock).toHaveBeenCalledWith("foo");
    });

    test("also mock implementation", () => {
        const mock = jest.fn().mockImplementation(() => "bar");

        expect(mock("foo")).toBe("bar");
        expect(mock).toHaveBeenCalledWith("foo");
    });

    test("mock implementation one time", () => {
        const mock = jest.fn().mockImplementationOnce(() => "bar");

        expect(mock("foo")).toBe("bar");
        expect(mock).toHaveBeenCalledWith("foo");

        expect(mock("baz")).toBe(undefined);
        expect(mock).toHaveBeenCalledWith("baz");
    });

    test("mock return value", () => {
        const mock = jest.fn();
        mock.mockReturnValue("bar");

        expect(mock("foo")).toBe("bar");
        expect(mock).toHaveBeenCalledWith("foo");
    });

    test("mock promise resolution", () => {
        const mock = jest.fn();
        mock.mockResolvedValue("bar");

        expect(mock("foo")).resolves.toBe("bar");
        expect(mock).toHaveBeenCalledWith("foo");
    });
});