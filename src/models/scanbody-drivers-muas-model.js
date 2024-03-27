/**
 * Modal for Scanbody Drivers (Multi-Unit Abutments) calculator
 * Expected properties
    "Implant Brand": { type: String },
    "Implant Model": { type: String },
    "Implant Diameter": { type: String },
    "Implant Platform": { type: String },
    "Implant Form": { type: String },
    "Design": { type: String },
    "Driver Length": { type: String },
    "Item Name": { type: String },
    "Item Number": { type: String },
    "Link to Purchase": { type: String },
    "Notes": { type: String },
 */

const mongoose = require("mongoose");

const { calculatorSchema } = require("./schema");

const ScanbodyDriversMUAsModel = mongoose.model(
  "ScanbodyDriversMUA",
  calculatorSchema,
  "ScanbodyDriversMUAs"
);

module.exports = ScanbodyDriversMUAsModel;
