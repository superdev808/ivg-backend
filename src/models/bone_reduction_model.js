const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
    "Implant Brand": { type: String },
    "Implant Model": { type: String },
    "Implant Diameter": { type: Schema.Types.Mixed },
    "Implant Platform": { type: Schema.Types.Mixed },
    "Will you perform bone reduction?": { type: String },
    "Bur Kit Name (Bone Reduction)": { type: String },
    "Item Code": { type: String },
    "Link to Purchase": { type: String },
    "Bur Kit (Denture Conversion) Name": { type: String },
});

const BoneReductionModel = mongoose.model("BoneReduction", schema, "BoneReduction");

module.exports = BoneReductionModel;

