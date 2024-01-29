const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
  "Implant Brand": { type: String },
  "Implant Model": { type: String },
  "Implant Diameter": { type: String },
  "Implant Platform": { type: String },
  "Engaging or Non Engaging": { type: String },
  "Abutment Angulation": { type: String },
  "Connection Type": { type: String },
  "Hexed or Non-Hexed": { type: String },
  "Collar Height": { type: String },
  "Restoration Type": { type: String },
  "Restoration Material": { type: String },
  "Temporary Coping Height": { type: String },
  "Item Name": { type: String },
  "Item Number": { type: String },
  "Link to Purchase": { type: String },
});

const TemporaryCopingsDirectToImplantsModel = mongoose.model(
  "TemporaryCopingsDirectToImplant",
  schema,
  "TemporaryCopingsDirectToImplants"
);

module.exports = TemporaryCopingsDirectToImplantsModel;
