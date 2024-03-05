const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
    "Implant Brand": { type: String },
    "Implant Model": { type: String },
    "Implant Diameter": { type: String },
    "Implant Platform": { type: String },
    "Product, Component, or Procedure": { type: String },
    "Torque Value": { type: String }
});

const ImplantTorquesModel = mongoose.model(
  "ImplantTorque",
  schema,
  "ImplantTorques"
);

module.exports = ImplantTorquesModel;
