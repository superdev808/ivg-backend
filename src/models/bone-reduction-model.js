const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
  "Implant Brand": { type: String },
  "Implant Model": { type: String },
  "Implant Diameter": { type: String },
  "Implant Platform": { type: String },
  "Bur Kit Name (Bone Reduction)": { type: String },
  "Item Number": { type: String },
  "Bur Kit (Bone Reduction) Link to Purchase": { type: String },
  "Bur Kit (Denture Conversion) Name": { type: String },
  "Bur Kit (Denture Conversion) Link to Purchase": { type: String },
  Notes: { type: String },
  Notes_1: { type: String },
});

const BoneReductionModel = mongoose.model(
  "BoneReduction",
  schema,
  "Surgery_BoneReduction"
);

module.exports = BoneReductionModel;
