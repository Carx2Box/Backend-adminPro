// Required
const mongooge = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongooge.Schema;

const rolesValid = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} it is not valid role'
};

// Define an schema of database.
var userSchema = new Schema({
    name: { type: String, required: [true, 'The name is required'] },
    email: { type: String, unique: true, required: [true, 'The email is required'] },
    password: { type: String, required: [true, 'The password is required'] },
    img: { type: String, required: false },
    role: { type: String, required: true, default: 'USER_ROLE', enum: rolesValid },
    google: { type: Boolean, default: false }
}, { collection: 'users' });

userSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });

// Export a model from Monggoe. 'users' name of the collection. 
module.exports = mongooge.model('User', userSchema);