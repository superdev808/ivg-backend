const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
    "Implant Brand": { type: String },
    "Implant Model": { type: String },
    "Implant Diameter": { type: Schema.Types.Mixed },
    "Implant Platform": { type: Schema.Types.Mixed },
    "Authentic or Generic?": { type: String },
    "Manufacturer": { type: String },
    "Scanbody Item Number": { type: String },
    "Link to Purchase": { type: String },
    "Interface/ Cross-Compatibility": { type: String },
    "Rx": { type: String },
    "Driver": { type: String },
    "Screw": { type: String },
});

const MasterScanbodyModel = mongoose.model("MasterScanbody", schema, "MasterScanbody");

module.exports = MasterScanbodyModel;

