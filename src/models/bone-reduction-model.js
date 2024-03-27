/**
 * Modal for Bone Reduction calculator
 * Expected properties
    "Implant Brand": { type: String },
    "Implant Model": { type: String },
    "Implant Diameter": { type: String },
    "Implant Platform": { type: String },
    "Bur Kit Name (Bone Reduction)": { type: String },
    "Item Number": { type: String },
    "Bur Kit (Bone Reduction) Link to Purchase": { type: String },
    "Bur Kit (Denture Conversion) Name": { type: String },
    "Bur Kit (Denture Conversion) Link to Purchase": { type: String },
    "Notes": { type: String },
    "Notes_1": { type: String },
 */

const mongoose = require("mongoose");

const { calculatorSchema } = require("./schema");

const BoneReductionModel = mongoose.model(
  "BoneReduction",
  calculatorSchema,
  "Surgery_BoneReduction"
);

module.exports = BoneReductionModel;
