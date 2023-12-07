const mongoose = require("mongoose");

const scanbodySchema = mongoose.Schema({
    "IMPLANT BRAND": { type: String },
    "IMPLANT SYSTEM": { type: String },
    "EXTERNAL DIAMETER": { type: String },
    "PLATFORM": { type: String },
    "Authentic or Generic": { type: String },
    "SCANBODY": { type: String },
    "SCANBODY ITEM #": { type: String },
    "Link to Purchase": { type: String },
    "Notes": { type: String },
    "Interface/ Cross-Compatibility": { type: String },
    "Rx": { type: String },
    "Driver": { type: String },
    "Screw": { type: String }
});

const ScanbodyModel = mongoose.model('Scanbody', scanbodySchema, "Scanbodies");

module.exports = ScanbodyModel;
