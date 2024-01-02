const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
    "Implant Brand": { type: String },
    "Implant Model": { type: String },
    "Implant Diameter": { type: Schema.Types.Mixed }, // Can be either string, number, or other types
    "Implant Platform": { type: Schema.Types.Mixed }, // Can be either string, number, or other types
    "Implant Length": { type: String },
    "Implant Surface Treatment": { type: String },
    "Do you need to purchase materials for chairside pick-up?": { type: String },
    "Luting Agent Name": { type: String },
    "Luting Agent Link to Purchase": { type: String },
    "Teflon Tape": { type: String },
    "Teflon Tape Link to Purchase": { type: String },
    "Material to close screw access hole Name": { type: String },
    "Material to close screw access hole link to purchase": { type: String },
});

const ChairSidePickUpModel = mongoose.model('ChairSidePickUp', schema, "Surgery_ChairSidePickUp");

module.exports = ChairSidePickUpModel;
