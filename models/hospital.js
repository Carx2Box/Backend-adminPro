// Required
const mongooge = require('mongoose');
const Schema = mongooge.Schema;

// Define an schema of database.
var hospitalSchema = new Schema({
    name: { type: String, required: [true, 'The name is required'] },
    img: { type: String, required: false },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
}, { collection: 'hospitals' });

// Export a model from Monggoe. 'users' name of the collection. 
module.exports = mongooge.model('Hospital', hospitalSchema);