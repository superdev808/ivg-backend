const mongoose = require("mongoose");
const { Schema } = mongoose;
const schema = mongoose.Schema({
    "Implant Brand": { type: String },
    "Implant Model": { type: String },
    "Implant Diameter": { type: Schema.Types.Mixed },
    "Implant Platform": { type: Schema.Types.Mixed },
    "Implant Length": { type: String },
    "Authentic or Generic?": { type: String },
    "Abutment Type": { type: String },
    "Driver Length": { type: String },
    "Machine or Manual?": { type: String },
    "Driver Name": { type: String },
    "Item Number": { type: String },
    "Link to Purchase": { type: String }
});

const MasterImplantDriverModel = mongoose.model('MasterImplantDriver', schema, "Surgery_MasterImplantDriver");

module.exports = MasterImplantDriverModel;
