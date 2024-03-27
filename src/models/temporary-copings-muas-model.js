/**
 * Modal for Temporary Copings (Multi-Unit Abutments) calculator
 * Expected properties
    "Implant Brand": { type: String },
    "Implant Model": { type: String },
    "Implant Diameter": { type: String },
    "Implant Platform": { type: String },
    "Abutment Diameter": { type: String },
    "Abutment Type": { type: String },
    "Angulation": { type: String },
    "Restoration Type": { type: String },
    "Material": { type: String },
    "Length": { type: String },
    "Diameter": { type: String },
    "Hexed or Non-Hexed": { type: String },
    "Item Name": { type: String },
    "Item Number": { type: String },
    "Link to Purchase": { type: String },
    "Notes": { type: String },
 */

const mongoose = require("mongoose");

const { calculatorSchema } = require("./schema");

const TemporaryCopingsMUAsModel = mongoose.model(
  "TemporaryCopingsMUA",
  calculatorSchema,
  "TemporaryCopingsMUAs"
);

module.exports = TemporaryCopingsMUAsModel;
