const mongoose = require('mongoose');
const mongoosePagniate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    verified: {
        type: Boolean,
        default: false,
    },



});

UserSchema.plugin(mongoosePagniate);
module.exports = User = mongoose.model('Users', UserSchema);
