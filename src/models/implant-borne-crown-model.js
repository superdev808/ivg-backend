/**
 * Modal for Implant-Borne Crown calculator
 */

const mongoose = require("mongoose");

const schema = new mongoose.Schema({}, { strict: false });

const ImplantBorneCrownModel = mongoose.model(
  "ImplantBorneCrown",
  schema,
  "ImplantBorneCrown"
);

module.exports = ImplantBorneCrownModel;
