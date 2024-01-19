const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
  "Implant Brand": { type: String },
  "Implant Model": { type: String },
  "Implant Diameter": { type: String },
  "Implant Platform": { type: String },
  "Implant Length": { type: String },
  "Implant Surface Treatment": { type: String },
  "Do you need to purchase an implant?": { type: String },
  "Item Name": { type: String },
  "Item Number": { type: String },
  "Link to Purchase": { type: String },
});

const ImplantsModel = mongoose.model(
  "Implant",
  schema,
  "Implants"
);

module.exports = ImplantsModel;
