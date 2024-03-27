/**
 * Modal for Implant Torque Guide calculator
 * Expected properties
    "Implant Brand": { type: String },
    "Implant Model": { type: String },
    "Implant Diameter": { type: String },
    "Implant Platform": { type: String },
    "Product, Component, or Procedure": { type: String },
    "Torque Value": { type: String },
    "Notes": { type: String },
 */

const mongoose = require("mongoose");

const { calculatorSchema } = require("./schema");

const ImplantTorquesModel = mongoose.model(
  "ImplantTorque",
  calculatorSchema,
  "ImplantTorques"
);

module.exports = ImplantTorquesModel;
