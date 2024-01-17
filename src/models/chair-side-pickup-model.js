const mongoose = require("mongoose");

const schema = mongoose.Schema({
  "Implant Brand": { type: String },
  "Implant Model": { type: String },
  "Implant Diameter": { type: String },
  "Implant Platform": { type: String },
  "Do you need to purchase materials for chairside pick-up?": { type: String },
  "Luting Agent Name": { type: String },
  "Luting Agent Link to Purchase": { type: String },
  "Teflon Tape": { type: String },
  "Teflon Tape Link to Purchase": { type: String },
  "Material to close screw access hole Name": { type: String },
  "Material to close screw access hole link to purchase": { type: String },
});

const ChairSidePickUpModel = mongoose.model('ChairSidePickUpMaterial', schema, "ChairSidePickUpMaterials");

module.exports = ChairSidePickUpModel;