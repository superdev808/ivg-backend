const mongoose = require("mongoose");

const scanbodySchema = mongoose.Schema({
    "Implant Brand": { type: String },
    "Implant Model": { type: String },
    "Implant Diameter": { type: String },
    "Implant Platform": { type: String },
    "Authentic or Generic": { type: String },
    "Scanbody Length": { type: String },
    "Manufacturer": { type: String },
    "Item Name": { type: String },
    "Scanbody Item Number": { type: String },
    "Link to Purchase": { type: String },
});

const ScanbodyModel = mongoose.model('Scanbody', scanbodySchema, "Scanbodies");

module.exports = ScanbodyModel;
