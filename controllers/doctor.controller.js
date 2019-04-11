const Doctor = require('../models/doctor');

class DoctorController {}

DoctorController.prototype.getById = (req, res, next) => {

    const id = req.params.id;

    Doctor.findById(id)
        .populate('user', "name email")
        .populate('hospital')
        .exec((err, doctor) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error loading doctor.',
                    errors: err
                });
            }

            if (!doctor) {

                return res.status(404).json({
                    ok: false,
                    message: 'The doctor with id' + id + ' no exists.',
                    errors: { message: 'No exists doctor with this Id' }
                });
            }

            return res.status(200).json({
                ok: true,
                doctor: doctor
            });
        });
};

DoctorController.prototype.getAll = (req, res, next) => {
    let fromRows = req.query.fromRows || 0;
    fromRows = Number(fromRows);

    Doctor.find({})
        .skip(fromRows)
        .limit(5)
        .populate('user', "name email")
        .populate('hospital')
        .exec(
            (err, doctors) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: 'Error loading doctors.',
                        errors: err
                    });
                }

                Doctor.countDocuments({}, (err, count) => {
                    return res.status(200).json({
                        ok: true,
                        rows: count,
                        doctors: doctors
                    });
                });
            });
};

DoctorController.prototype.add = (req, res, next) => {

    const body = req.body;
    var doctor = new Doctor({
        name: body.name,
        img: body.img,
        user: req.user._id,
        hospital: body.hospital
    });

    doctor.save((err, doctorSave) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Error to create a doctor.',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            doctor: doctorSave,
            usertoken: req.user
        });
    });
};

DoctorController.prototype.update = (req, res, next) => {

    const body = req.body;
    const id = req.params.id;

    Doctor.findById(id, (err, doctor) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error get doctor.',
                errors: err
            });
        }

        if (!doctor) {
            return res.status(400).json({
                ok: false,
                message: 'The doctor with id' + id + ' no exists.',
                errors: { message: 'No exists doctor with this Id' }
            });
        }

        doctor.name = body.name;
        doctor.user = body.user._id;
        doctor.hospital = body.hospital;

        doctor.save((err, doctorSave) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: 'Error to update doctor.',
                    errors: err
                });
            }

            return res.status(200).json({
                ok: true,
                doctor: doctorSave,
                usertoken: req.user
            });
        });
    });
};

DoctorController.prototype.delete = (req, res, next) => {
    const id = req.params.id;

    Doctor.findByIdAndDelete(id, (err, doctorDeleted) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error to delete doctor.',
                errors: err
            });
        }

        return res.status(200).json({
            ok: true,
            body: doctorDeleted
        });
    });
};


module.exports = new DoctorController();