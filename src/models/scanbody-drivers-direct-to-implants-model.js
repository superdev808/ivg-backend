/**
 * Modal for Scanbody Drivers (Direct to Implant) calculator
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

const ScanbodyDriversDirectToImplantsModel = mongoose.model(
  "ScanbodyDriversDirectToImplant",
  calculatorSchema,
  "ScanbodyDriversDirectToImplants"
);

module.exports = ScanbodyDriversDirectToImplantsModel;
