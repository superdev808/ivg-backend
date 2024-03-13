const mongoose = require("mongoose");

const schema = mongoose.Schema({
  "Implant Brand": { type: String },
  "Implant Model": { type: String },
  "Implant Diameter": { type: String },
  "Implant Platform": { type: String },
  "Luting Agent Name": { type: String },
  "Luting Agent Link to Purchase": { type: String },
  "Teflon Tape": { type: String },
  "Teflon Tape Link to Purchase": { type: String },
  "Material to Close Screw Access Hole Name": { type: String },
  "Material to Close Screw Access Hole Link to Purchase": { type: String },
  Notes: { type: String },
  Notes_1: { type: String },
  Notes_2: { type: String },
});

const ChairSidePickUpModel = mongoose.model(
  "ChairSidePickUpMaterial",
  schema,
  "ChairSidePickUpMaterials"
);

module.exports = ChairSidePickUpModel;
