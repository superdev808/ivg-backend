const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
  "Implant Brand": { type: String },
  "Implant Model": { type: String },
  "Implant Diameter": { type: String },
  "Implant Platform": { type: String },
  "Authentic or Generic": { type: String },
  "Digital or Lab Analog": { type: String },
  "Abutment Height": { type: String },
  "Item Name": { type: String },
  "Item Number": { type: String },
  "Link to Purchase": { type: String },
});

const ImplantAnalogsModel = mongoose.model(
  "ImplantAnalog",
  schema,
  "ImplantAnalogs"
);

module.exports = ImplantAnalogsModel;
