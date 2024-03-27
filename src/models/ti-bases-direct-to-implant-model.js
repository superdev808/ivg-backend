/**
 * Modal for Ti Bases (Direct to Implant) calculator
 * Expected properties
    "Implant Brand": { type: String },
    "Implant Model": { type: String },
    "Implant Diameter": { type: String },
    "Implant Platform": { type: String },
    "Engaging or Non-Engaging": { type: String },
    "Abutment Diameter": { type: String },
    "Connection Type": { type: String },
    "Angulation": { type: String },
    "Abutment Type": { type: String },
    "Abutment Height": { type: String },
    "Cementable Area": { type: String },
    "Material": { type: String },
    "Collar Height": { type: String },
    "Hexed or Non-Hexed": { type: String },
    "Item Name": { type: String },
    "Item Number": { type: String },
    "Link to Purchase": { type: String },
    "Notes": { type: String },
 */

const mongoose = require("mongoose");

const { calculatorSchema } = require("./schema");

const TiBasesDirectToImplantsModel = mongoose.model(
  "TiBasesDirectToImplant",
  calculatorSchema,
  "TiBasesDirectToImplants"
);

module.exports = TiBasesDirectToImplantsModel;
