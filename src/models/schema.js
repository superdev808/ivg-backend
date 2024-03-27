const mongoose = require("mongoose");

const calculatorSchema = new mongoose.Schema(
  {
    "Implant Brand": { type: String },
    "Implant Model": { type: String },
    "Implant Diameter": { type: String },
    "Implant Platform": { type: String },
  },
  { strict: false }
);

module.exports = { calculatorSchema };
