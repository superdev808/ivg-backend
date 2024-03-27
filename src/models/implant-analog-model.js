/**
 * Modal for Crown Implant Analogs calculator
 * Expected properties
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
    "Notes": { type: String },
 */

const mongoose = require("mongoose");

const { calculatorSchema } = require("./schema");

const ImplantAnalogsModel = mongoose.model(
  "ImplantAnalog",
  calculatorSchema,
  "ImplantAnalogs"
);

module.exports = ImplantAnalogsModel;
