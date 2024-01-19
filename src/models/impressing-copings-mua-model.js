const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
  "Implant Brand": { type: String },
  "Implant Model": { type: String },
  "Implant Diameter": { type: String },
  "Implant Platform": { type: String },
  "Open or Closed Tray": { type: String },
  "Impression Coping Length": { type: String },
  "Hexed or Non-Hexed": { type: String },
  "Engaging or Non-Engaging": { type: String },
  "Abutment Type": { type: String },
  "Item Name": { type: String },
  "Item Number": { type: String },
  "Link to Purchase": { type: String },
});

const ImpressingCopingsMUAsModel = mongoose.model(
  "ImpressingCopingsMUA",
  schema,
  "ImpressingCopingsMUAs"
);

module.exports = ImpressingCopingsMUAsModel;
