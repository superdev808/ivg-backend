/**
 * Modal for Drivers (Restorative, Multi-Unit Abutments) calculator
 * Expected properties
    "Implant Brand": { type: String },
    "Implant Model": { type: String },
    "Implant Diameter": { type: String },
    "Implant Platform": { type: String },
    "Machine or Manual": { type: String },
    "Driver Length": { type: String },
    "Design": { type: String },
    "MUA Type": { type: String },
    "Abutment Angulation": { type: String },
    "Diameter": { type: String },
    "One Piece or Torque Attachment": { type: String },
    "Item Name": { type: String },
    "Item Number": { type: String },
    "Link to Purchase": { type: String },
    "Notes": { type: String },
 */

const mongoose = require("mongoose");

const { calculatorSchema } = require("./schema");

const RestorativeMultiUnitAbutmentsModel = mongoose.model(
  "RestorativeMultiUnitAbutment",
  calculatorSchema,
  "RestorativeMultiUnitAbutments"
);

module.exports = RestorativeMultiUnitAbutmentsModel;
