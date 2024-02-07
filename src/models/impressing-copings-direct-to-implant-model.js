const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
  "Implant Brand": { type: String },
  "Implant Model": { type: String },
  "Implant Diameter": { type: String },
  "Implant Platform": { type: String },
  "Open or Closed Tray": { type: String },
  "Angulation": { type: String },
  "Impression Coping Diameter": { type: String },
  "Impression Coping Design": { type: String },
  "Engaging or Non-Engaging": { type: String },
  "Impression Coping Length": { type: String },
  "Cementable Area": { type: String },
  "Emergence Profile": { type: String },
  "Item Name": { type: String },
  "Item Number": { type: String },
  "Link to Purchase": { type: String },
});

const ImpressingCopingsDirectToImplantsModel = mongoose.model(
  "ImpressingCopingsDirectToImplant",
  schema,
  "ImpressingCopingsDirectToImplants"
);

module.exports = ImpressingCopingsDirectToImplantsModel;
