/**
 * Modal for Impression Copings (Direct to Implant) calculator
 * Expected properties
    "Implant Brand": { type: String },
    "Implant Model": { type: String },
    "Implant Diameter": { type: String },
    "Implant Platform": { type: String },
    "Open or Closed Tray": { type: String },
    "Angulation": { type: String },
    "Impression Coping Diameter": { type: String },
    "Impression Coping Design": { type: String },
    "Impression Coping Length": { type: String },
    "Cementable Area": { type: String },
    "Engaging or Non-Engaging": { type: String },
    "Emergence Profile": { type: String },
    "Item Name": { type: String },
    "Item Number": { type: String },
    "Link to Purchase": { type: String },
    "Notes": { type: String },
 */

const mongoose = require("mongoose");

const { calculatorSchema } = require("./schema");

const ImpressingCopingsDirectToImplantsModel = mongoose.model(
  "ImpressingCopingsDirectToImplant",
  calculatorSchema,
  "ImpressingCopingsDirectToImplants"
);

module.exports = ImpressingCopingsDirectToImplantsModel;
