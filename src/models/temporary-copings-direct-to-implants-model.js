/**
 * Modal for Temporary Copings (Direct to Implant) calculator
 * Expected properties
    "Implant Brand": { type: String },
    "Implant Model": { type: String },
    "Implant Diameter": { type: String },
    "Implant Platform": { type: String },
    "Engaging or Non-Engaging": { type: String },
    "Abutment Angulation": { type: String },
    "Abutment Diameter": { type: String },
    "Abutment Type": { type: String },
    "Connection Type": { type: String },
    "Cementable Area": { type: String },
    "Hexed or Non-Hexed": { type: String },
    "Collar Height": { type: String },
    "Restoration Type": { type: String },
    "Restoration Material": { type: String },
    "Temporary Coping Height": { type: String },
    "Item Name": { type: String },
    "Item Number": { type: String },
    "Link to Purchase": { type: String },
    "Notes": { type: String },
 */

const mongoose = require("mongoose");

const { calculatorSchema } = require("./schema");

const TemporaryCopingsDirectToImplantsModel = mongoose.model(
  "TemporaryCopingsDirectToImplant",
  calculatorSchema,
  "TemporaryCopingsDirectToImplants"
);

module.exports = TemporaryCopingsDirectToImplantsModel;
