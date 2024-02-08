const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
  "Implant Brand": { type: String },
  "Implant Model": { type: String },
  "Implant Diameter": { type: String },
  "Implant Platform": { type: String },
  "Machine or Manual": { type: String },
  "Driver Length": { type: String },
  Design: { type: String },
  "MUA Type": { type: String },
  "Abutment Angulation": { type: String },
  Diameter: { type: String },
  "One Piece or Torque Attachment": { type: String },
  "Item Name": { type: String },
  "Item Number": { type: String },
  "Link to Purchase": { type: String },
});

const RestorativeMultiUnitAbutmentsModel = mongoose.model(
  "RestorativeMultiUnitAbutment",
  schema,
  "RestorativeMultiUnitAbutments"
);

module.exports = RestorativeMultiUnitAbutmentsModel;
