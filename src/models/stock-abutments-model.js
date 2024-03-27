/**
 * Modal for Stock Abutments calculator
 * Expected properties
    "Implant Brand": { type: String },
    "Implant Model": { type: String },
    "Implant Diameter": { type: String },
    "Implant Platform": { type: String },
    "Material": { type: String },
    "Impression Type": { type: String },
    "Fixation": { type: String },
    "Restoration Type": { type: String },
    "Hexed or Non-Hexed": { type: String },
    "Angulation": { type: String },
    "Abutment Diameter": { type: String },
    "Collar Height": { type: String },
    "Abutment Height": { type: String },
    "Engaging": { type: String },
    "Emergence Profile": { type: String },
    "Item Name": { type: String },
    "Item Number": { type: String },
    "Link to Purchase": { type: String },
    "Notes": { type: String },
 */

const mongoose = require("mongoose");

const { calculatorSchema } = require("./schema");

const StockAbutmentsModel = mongoose.model(
  "StockAbutments",
  calculatorSchema,
  "StockAbutments"
);

module.exports = StockAbutmentsModel;
