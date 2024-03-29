/**
 * Modal for Tooth-Borne Bridge calculator
 */

const mongoose = require("mongoose");

const schema = new mongoose.Schema({}, { strict: false });

const ToothBorneBridgeModel = mongoose.model(
  "ToothBorneBridge",
  schema,
  "ToothBorneBridge"
);

module.exports = ToothBorneBridgeModel;
