// Required
const mongooge = require('mongoose');
const Schema = mongooge.Schema;

// Define an schema of database.
var userSchema = new Schema({
    name: { type: String, required: [true, 'The name is required'] },
    email: { type: String, unique: true, required: [true, 'The email is required'] },
    password: { type: String, required: [true, 'The password is required'] },
    img: { type: String, required: false },
    role: { type: String, required: true, default: 'USER_ROLE' }
});

// Export a model from Monggoe. 'users' name of the collection. 
module.exports = mongooge.model('User', userSchema, 'users');