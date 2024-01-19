const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
  "Implant Brand": { type: String },
  "Implant Model": { type: String },
  "Implant Diameter": { type: String },
  "Implant Platform": { type: String },
  "Driver Length": { type: String },
  "Item Name": { type: String },
  "Item Number": { type: String },
  "Link to Purchase": { type: String },
});

const ScanbodyDriversMUAsModel = mongoose.model(
  "ScanbodyDriversMUA",
  schema,
  "ScanbodyDriversMUAs"
);

module.exports = ScanbodyDriversMUAsModel;
