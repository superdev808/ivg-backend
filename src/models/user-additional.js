const mongoose = require('mongoose');
const mongoosePagniate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const UserAdditionalSchema = new Schema({
    userId: {
        type: String,
        required: true,
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
    },
 
});

UserAdditionalSchema.plugin(mongoosePagniate);
module.exports = UserAdditional = mongoose.model('UserAdditional', UserAdditionalSchema);
