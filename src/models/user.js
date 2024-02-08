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
    verificationToken: {
        type: String,
    },
    verificationTokenExpiry: {
        type: Date,
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpiry: {
        type: Date,
    },
    organizationName: {
        type: String,
        required: true,
    },
    organizationRole: {
        type: String,
        required: true,
    },
    organizationRoleOther: {
        type: String,
        required: false,
    },
    dentalPracticeRole: {
        type: String,
        required: false,
    },
    organizationState: {
        type: String,
        required: true,
    },
    organizationNumber: {
        type: String,
        required: true,
    },
    referralSource: {
        type: String,
        required: true,
    },
    referralSourceOther: {
        type: String,
        required: false,
    },
    logo: {
        type: String,
        required: false,
        default: '',
    },
    savedResults: {
        type: Array,
        required: false,
        default: [],
    },
});

UserSchema.plugin(mongoosePagniate);
module.exports = User = mongoose.model('Users', UserSchema);
