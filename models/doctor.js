// Required
const mongooge = require('mongoose');
const Schema = mongooge.Schema;

// Define an schema of database.
var doctorSchema = new Schema({
    name: { type: String, required: [true, 'The name is required'] },
    img: { type: String, required: false },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    hospital: { type: Schema.Types.ObjectId, ref: 'Hospital', required: [true, 'The id hospital is required'] }
}, { collection: 'doctors' });

// Export a model from Monggoe. 'hospital' name of the collection. 
module.exports = mongooge.model('Doctor', doctorSchema);