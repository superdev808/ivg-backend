/**
 * Modal for Impression Copings (Multi-Unit Abutments) calculator
 * Expected properties
    "Implant Brand": { type: String },
    "Implant Model": { type: String },
    "Implant Diameter": { type: String },
    "Implant Platform": { type: String },
    "Open or Closed Tray": { type: String },
    "Impression Coping Length": { type: String },
    "Angulation": { type: String },
    "Fixation": { type: String },
    "Hexed or Non-Hexed": { type: String },
    "Engaging or Non-Engaging": { type: String },
    "Cementable Area": { type: String },
    "Abutment Type": { type: String },
    "Abutment Diameter": { type: String },
    "Item Name": { type: String },
    "Item Number": { type: String },
    "Link to Purchase": { type: String },
    "Notes": { type: String },
 */

const mongoose = require("mongoose");

const { calculatorSchema } = require("./schema");

const ImpressingCopingsMUAsModel = mongoose.model(
  "ImpressingCopingsMUA",
  calculatorSchema,
  "ImpressingCopingsMUAs"
);

module.exports = ImpressingCopingsMUAsModel;
