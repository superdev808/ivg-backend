/**
 * Modal for Tooth-Borne Crown calculator
 */

const mongoose = require("mongoose");

const schema = new mongoose.Schema({}, { strict: false });

const ToothBorneCrownModel = mongoose.model(
  "ToothBorneCrown",
  schema,
  "ToothBorneCrown"
);

module.exports = ToothBorneCrownModel;
