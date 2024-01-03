const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
    "Implant Brand": { type: String },
    "Implant Model": { type: String },
    "Implant Diameter": { type: Schema.Types.Mixed }, // Can be either string, number, or other types
    "Implant Platform": { type: Schema.Types.Mixed }, // Can be either string, number, or other types
    "Implant Length": { type: String },
    "Implant Surface Treatment": { type: String },
    "Will you perform bone reduction?": { type: String },
    "Bur Kit Name (Bone Reduction)": { type: String },
    "Bur Kit Product Code": { type: String },
    "Bur Kit Link to Purchase": { type: String },
    "Surgical Bur Kit (Denture Conversion)": { type: String },
});

const BoneReductionModel = mongoose.model('BoneReduction', schema, "Surgery_BoneReduction");

module.exports = BoneReductionModel;

