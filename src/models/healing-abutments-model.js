const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
  "Implant Brand": { type: String },
  "Implant Model": { type: String },
  "Implant Diameter": { type: String },
  "Implant Platform": { type: String },
  "Authentic or Generic": { type: String },
  "Abutment Height": { type: String },
  "Collar Height": { type: String },
  "Emergence Profile": { type: String },
  "Abutment Material": { type: String },
  "Abutment Diameter": { type: String },
  "Item Name": { type: String },
  "Item Number": { type: String },
  "Link to Purchase": { type: String },
});

const HealingAbutmentsModel = mongoose.model(
  "HealingAbutment",
  schema,
  "HealingAbutments"
);

module.exports = HealingAbutmentsModel;
