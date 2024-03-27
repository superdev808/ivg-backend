/**
 * Modal for Drivers (Restorative, Direct to Implant) calculator
 * Expected properties
    "Implant Brand": { type: String },
    "Implant Model": { type: String },
    "Implant Diameter": { type: String },
    "Implant Platform": { type: String },
    "Implant Length": { type: String },
    "Authentic or Generic": { type: String },
    "Driver Length": { type: String },
    "One Piece or Torque Attachment": { type: String },
    "Driver Size": { type: String },
    "Abutment Angulation": { type: String },
    "Machine or Manual": { type: String },
    "Item Name": { type: String },
    "Item Number": { type: String },
    "Link to Purchase": { type: String },
    "Notes": { type: String },
 */

const mongoose = require("mongoose");

const { calculatorSchema } = require("./schema");

const RestorativeDirectToImplantModel = mongoose.model(
  "RestorativeDirectToImplantMaterial",
  calculatorSchema,
  "RestorativeDirectToImplantMaterials"
);

module.exports = RestorativeDirectToImplantModel;
