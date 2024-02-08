const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
  "Implant Brand": { type: String },
  "Implant Model": { type: String },
  "Implant Diameter": { type: String },
  "Implant Platform": { type: String },
  "Abutment Diameter": { type: String },
  "Abutment Type": { type: String },"Angulation": { type: String },
  "Restoration Type": { type: String },
  Material: { type: String },
  Length: { type: String },
  Diameter: { type: String },
  "Hexed or Non-Hexed": { type: String },
  "Item Name": { type: String },
  "Item Number": { type: String },
  "Link to Purchase": { type: String },
});

const TemporaryCopingsMUAsModel = mongoose.model(
  "TemporaryCopingsMUA",
  schema,
  "TemporaryCopingsMUAs"
);

module.exports = TemporaryCopingsMUAsModel;
