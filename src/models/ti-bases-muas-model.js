/**
 * Modal for Ti Bases (Multi-Unit Abutments) calculator
 * Expected properties
    "Implant Brand": { type: String },
    "Implant Model": { type: String },
    "Implant Diameter": { type: String },
    "Implant Platform": { type: String },
    "Engaging or Non-Engaging": { type: String },
    "MUA Type": { type: String },
    "Connection": { type: String },
    "Abutment Diameter": { type: String },
    "Abutment Height": { type: String },
    "Collar Height": { type: String },
    "Angulation": { type: String },
    "Material": { type: String },
    "Item Name": { type: String },
    "Item Number": { type: String },
    "Link to Purchase": { type: String },
    "Notes": { type: String },
 */

const mongoose = require("mongoose");

const { calculatorSchema } = require("./schema");

const TiBasesMUAsModel = mongoose.model(
  "TiBasesMUA",
  calculatorSchema,
  "TiBasesMUAs"
);

module.exports = TiBasesMUAsModel;
