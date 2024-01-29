const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
  "Implant Brand": { type: String },
  "Implant Model": { type: String },
  "Implant Diameter": { type: String },
  "Implant Platform": { type: String },
  "Abutment Angulation": { type: String },
  "Abutment Engaging Type": { type: String },
  "Abutment Diameter": { type: String },
  "Abutment Height": { type: String },
  "Collar Height": { type: String },
  "Item Name": { type: String },
  "Item Number": { type: String },
  "Link to Purchase": { type: String },
});

const MUAsModel = mongoose.model(
  "MUA",
  schema,
  "MUAs"
);

module.exports = MUAsModel;
