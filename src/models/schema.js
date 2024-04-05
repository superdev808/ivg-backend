const mongoose = require("mongoose");

const calculatorSchema = new mongoose.Schema(
  {
    "0": { type: String },
    "1": { type: String },
    "2": { type: String },
    "3": { type: String },
  },
  { strict: false }
);

module.exports = { calculatorSchema };
