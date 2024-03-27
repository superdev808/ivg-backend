/**
 * Modal for Multi-Unit Abutments calculator
 * Expected properties
    "Implant Brand": { type: String },
    "Implant Model": { type: String },
    "Implant Diameter": { type: String },
    "Implant Platform": { type: String },
    "Abutment Angulation": { type: String },
    "Connection Type": { type: String },
    "Abutment Engaging Type": { type: String },
    "Abutment Diameter": { type: String },
    "Abutment Type": { type: String },
    "Abutment Height": { type: String },
    "Implant or Abutment Level": { type: String },
    "Collar Height": { type: String },
    "Item Name": { type: String },
    "Item Number": { type: String },
    "Link to Purchase": { type: String },
    "Notes": { type: String },
 */

const mongoose = require("mongoose");

const { calculatorSchema } = require("./schema");

const MUAsModel = mongoose.model("MUA", calculatorSchema, "MUAs");

module.exports = MUAsModel;
