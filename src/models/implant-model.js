/**
 * Modal for Implants calculator
 * Expected properties
    "Implant Brand": { type: String },
    "Implant Model": { type: String },
    "Implant Diameter": { type: String },
    "Implant Platform": { type: String },
    "Implant Length": { type: String },
    "Implant Form": { type: String },
    "Mount Option": { type: String },
    "Implant Surface Treatment": { type: String },
    "Item Name": { type: String },
    "Item Number": { type: String },
    "Link to Purchase": { type: String },
    "Notes": { type: String },
 */

const mongoose = require("mongoose");

const { calculatorSchema } = require("./schema");

const ImplantsModel = mongoose.model("Implant", calculatorSchema, "Implants");

module.exports = ImplantsModel;
