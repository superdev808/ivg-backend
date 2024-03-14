const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
  "Implant Brand": { type: String },
  "Implant Model": { type: String },
  "Implant Diameter": { type: String },
  "Implant Platform": { type: String },
  "Authentic or Generic": { type: String },
  "Abutment Diameter": { type: String },
  "Abutment Height": { type: String },
  "Abutment Type": { type: String },
  Angulation: { type: String },
  "Manufacturer Name": { type: String },
  "Item Name": { type: String },
  "Item Number": { type: String },
  "Link to Purchase": { type: String },
  Notes: { type: String },
});

const ScanbodyMUAsModel = mongoose.model("ScanbodyMUA", schema, "ScanbodyMUAs");

module.exports = ScanbodyMUAsModel;
