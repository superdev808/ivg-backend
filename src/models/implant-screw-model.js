/**
 * Modal for Implant Screws calculator
 * Expected properties
    "Implant Brand": { type: String },
    "Implant Model": { type: String },
    "Implant Diameter": { type: String },
    "Implant Platform": { type: String },
    "Authentic or Generic": { type: String },
    "Abutment Type": { type: String },
    "Design": { type: String },
    "Restoration Connection Type": { type: String },
    "Restoration Type": { type: String },
    "Anterior or Posterior": { type: String },
    "Screw Length": { type: String },
    "Screw Material": { type: String },
    "Abutment Angulation": { type: String },
    "Open or Closed Tray": { type: String },
    "Collar Height": { type: String },
    "Type of Head": { type: String },
    "Item Name": { type: String },
    "Item Number": { type: String },
    "Link to Purchase": { type: String },
    "Notes": { type: String },
 */

const mongoose = require("mongoose");

const { calculatorSchema } = require("./schema");

const ImplantScrewsModel = mongoose.model(
  "ImplantScrew",
  calculatorSchema,
  "ImplantScrews"
);

module.exports = ImplantScrewsModel;
