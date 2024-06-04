const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
  {
    type: { type: String, required: true },
    collectionName: { type: String, required: true },
    label: { type: String, default: "" },
    description: { type: String, default: "" },
    disabled: { type: Boolean, default: false },
    isProduction: { type: Boolean, default: true },
    isCustom: { type: Boolean, default: false },
    outputType: { type: String, required: true, default: "CALC-1B" },
  },
  {
    statics: {
      getCalculators() {
        return this.find({ disabled: false }, { _id: 0 });
      },
    },
  }
);

const CalculatorModel = mongoose.model("Calculators", schema, "Calculators");

module.exports = CalculatorModel;
