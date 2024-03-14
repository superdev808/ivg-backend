const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
  "Implant Brand": { type: String },
  "Implant Model": { type: String },
  "Implant Diameter": { type: String },
  "Implant Platform": { type: String },
  Material: { type: String },
  "Impression Type": { type: String },
  Fixation: { type: String },
  "Restoration Type": { type: String },
  "Hexed or Non-Hexed": { type: String },
  Angulation: { type: String },
  "Abutment Diameter": { type: String },
  "Collar Height": { type: String },
  "Abutment Height": { type: String },
  Engaging: { type: String },
  "Emergence Profile": { type: String },
  "Item Name": { type: String },
  "Item Number": { type: String },
  "Link to Purchase": { type: String },
  Notes: { type: String },
});

const StockAbutmentsModel = mongoose.model(
  "StockAbutments",
  schema,
  "StockAbutments"
);

module.exports = StockAbutmentsModel;
