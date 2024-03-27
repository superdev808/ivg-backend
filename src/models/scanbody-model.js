/**
 * Modal for Scanbodies (Single Unit) calculator
 * Expected properties
    "Implant Brand": { type: String },
    "Implant Model": { type: String },
    "Implant Diameter": { type: String },
    "Implant Platform": { type: String },
    "Authentic or Generic": { type: String },
    "Scanbody Length": { type: String },
    "Manufacturer": { type: String },
    "Item Name": { type: String },
    "Scanbody Item Number": { type: String },
    "Link to Purchase": { type: String },
    "Notes": { type: String },
 */

const mongoose = require("mongoose");

const { calculatorSchema } = require("./schema");

const ScanbodyModel = mongoose.model(
  "Scanbody",
  calculatorSchema,
  "Scanbodies"
);

module.exports = ScanbodyModel;
