const sinon = require('sinon');
const Controller = require('./doctor.controller');
const Doctor = require('../models/doctor');

function foo() {
    return 1;
}

function CalledMethod(arg) {
    if (arg === 1) {
        return foo();
    }
}

describe('Mock test', () => {
    test("returns undefined by default", () => {
        const mock = jest.fn();

        let result = mock("foo");

        expect(result).toBeUndefined();
        expect(mock).toHaveBeenCalled();
        expect(mock).toHaveBeenCalledTimes(1);
        expect(mock).toHaveBeenCalledWith("foo");
    });
});



describe('Doctor Controller', () => {
    let req = {
            body: {
                _id: "5aa06bb80738152cfd536fdc",
                name: "Antonio Villegas",
                hospital: "5c38cf7962012f22dc330261",
            },
            doctor: {
                _id: "5aa06bb80738152cfd536fdc",
                name: "Antonio Villegas",
                hospital: {
                    "_id": "5c38cf7962012f22dc330261",
                    "name": "Hospital San Rafael",
                    "user": "5c269736e973d336444c0b32",
                    "img": "5c38cf7962012f22dc330261-5fe47b353f36602e930484f13b9979a1.jpg"
                },
                "img": "5c40e4e645fc072a14d00531-b8c8ac8b6dcfaff3558786b95f2cbddb.jpg"
            },
            params: {
                id: "5aa06bb80738152cfd536fdc",
                driverId: "5aa13452e1e2c3277688e734"
            },
            query: {
                fromRows: "10"
            }
        },
        error = new Error({ message: "blah blah" }),
        res = {},
        expectedResult;

    describe('Get Doctor by Id', () => {
        beforeEach(function() {
            res = {
                status: sinon.stub().returnsThis(),
                json: sinon.spy()
            };
            expectedResult = req.body;
        });

        afterEach(function() {
            sinon.restore();
        });

        test('should return status 500 on server error when the Doctor if exists error in database', function() {

            sinon.stub(Doctor, 'findById').returns({
                populate: sinon.stub().returns({
                    populate: sinon.stub().returns({
                        exec: sinon.stub().yields(error, null)
                    })
                })
            });

            Controller.getById(req, res);

            sinon.assert.calledWith(Doctor.findById, req.params.id);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledWith(res.json, sinon.match({ ok: false }));
            sinon.assert.calledWith(res.json, sinon.match({ message: 'Error loading doctor.' }));
            sinon.assert.calledWith(res.json, sinon.match({ errors: error }));
        });

        test('should return status 404 on server error when the Doctor if not exists in database', function() {

            sinon.stub(Doctor, 'findById').returns({
                populate: sinon.stub().returns({
                    populate: sinon.stub().returns({
                        exec: sinon.stub().yields(null, null)
                    })
                })
            });

            Controller.getById(req, res);

            sinon.assert.calledWith(Doctor.findById, req.params.id);
            sinon.assert.calledWith(res.status, 404);
            sinon.assert.calledWith(res.json, sinon.match({ ok: false }));
            sinon.assert.calledWith(res.json, sinon.match({ message: 'The doctor with id' + req.params.id + ' no exists.' }));
            sinon.assert.calledWith(res.json, sinon.match({ errors: { message: 'No exists doctor with this Id' } }));
        });

        test('should return status 200 on server error when the Doctor exists in database', function() {

            sinon.stub(Doctor, 'findById').returns({
                populate: sinon.stub().returns({
                    populate: sinon.stub().returns({
                        exec: sinon.stub().yields(null, req.doctor)
                    })
                })
            });

            Controller.getById(req, res);

            sinon.assert.calledWith(Doctor.findById, req.params.id);
            sinon.assert.calledWith(res.status, 200);
            sinon.assert.calledWith(res.json, sinon.match({ ok: true }));
            sinon.assert.calledWith(res.json, sinon.match({ doctor: req.doctor }));
        });
    });

    describe('Get All', () => {
        beforeEach(function() {
            res = {
                status: sinon.stub().returnsThis(),
                json: sinon.spy()
            };
            expectedResult = req.body;
        });

        afterEach(function() {
            sinon.restore();
        });

        test('should return status 500 on server error when it exists error in database', function() {

            sinon.stub(Doctor, 'find').returns({
                skip: sinon.stub().returns({
                    limit: sinon.stub().returns({
                        populate: sinon.stub().returns({
                            populate: sinon.stub().returns({
                                exec: sinon.stub().yields(error, null)
                            })
                        })
                    })
                })
            });

            Controller.getAll(req, res);

            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledWith(res.json, sinon.match({ ok: false }));
            sinon.assert.calledWith(res.json, sinon.match({ message: 'Error loading doctors.' }));
            sinon.assert.calledWith(res.json, sinon.match({ errors: error }));
        });


        test('should return status 200 on server error when the Doctor exists in database', function() {

            sinon.stub(Doctor, 'find').returns({
                skip: sinon.stub().returns({
                    limit: sinon.stub().returns({
                        populate: sinon.stub().returns({
                            populate: sinon.stub().returns({
                                exec: sinon.stub().yields(null, [req.doctor])
                            })
                        })
                    })
                })
            });

            sinon.stub(Doctor, 'countDocuments').yields(null, 1);


            Controller.getAll(req, res);

            sinon.assert.calledWith(res.status, 200);
            sinon.assert.calledWith(res.json, sinon.match({ ok: true }));
            sinon.assert.calledWith(res.json, sinon.match({ rows: 1 }));
            sinon.assert.calledWith(res.json, sinon.match({ doctors: [req.doctor] }));
        });
    });
});