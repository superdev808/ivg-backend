const mongoose = require("mongoose");

const scanbodySchema = mongoose.Schema({
    "Implant Brand": { type: String },
    "Implant System": { type: String },
    "External Diameter": { type: String },
    "Platform": { type: String },
    "Authentic or Generic?": { type: String },
    "Manufacturer": { type: String },
    "Scanbody Item Number": { type: String },
    "Link to Purchase": { type: String },
    "Notes": { type: String },
    "Interface/ Cross-Compatibility": { type: String },
    "Rx": { type: String },
    "Driver": { type: String },
    "Screw": { type: String }
});

const ScanbodyModel = mongoose.model('Scanbody', scanbodySchema, "Scanbodies");

module.exports = ScanbodyModel;
