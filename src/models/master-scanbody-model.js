const mongoose = require("mongoose");

const scanbodySchema = mongoose.Schema({
    "Implant Brand": { type: String },
    "Implant Model": { type: String },
    "Implant Diameter": { type: String },
    "Implant Platform": { type: String },
    "Authentic or Generic": { type: String },
    "Manufacturer": { type: String },
    "Scanbody Item Number": { type: String },
    "Link to Purchase": { type: String },
    "Notes": { type: String },
    "Interface/ Cross-Compatibility": { type: String },
    "Rx": { type: String },
    "Driver": { type: String },
    "Screw": { type: String }
});

const MasterScanbodyModel = mongoose.model('MasterScanbody', scanbodySchema, "MasterScanbody");

module.exports = MasterScanbodyModel;
