/**
 * Modal for Implant-Borne Bridge calculator
 */

const mongoose = require("mongoose");

const schema = new mongoose.Schema({}, { strict: false });

const ImplantBorneBridgeModel = mongoose.model(
  "ImplantBorneBridge",
  schema,
  "ImplantBorneBridge"
);

module.exports = ImplantBorneBridgeModel;
