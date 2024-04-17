const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
  colIndex: { type: Number, required: true }, // the index of this header in the sheet
  colName: { type: String, required: true }, // the name of this header - first row in the sheet
  colText: { type: String, default: "" }, // the description of this header to display on client-side UI - second row in the sheet
  groupId: { type: String, default: "" }, // the grouping name of this header - third row in the sheet
  groupName: { type: String, default: "" }, // the description of the group to display on client-side UI - fourth row in the sheet (if same group name, then same group text)
  groupText: { type: String, default: "" }, // the description of this header within the group - fifth row in the sheet
  isCommon: { type: Boolean, default: false },
  calculatorType: { type: String, required: true },
});

const MetaCalcModel = mongoose.model("MetaCalc", schema, "MetaCalc");

module.exports = MetaCalcModel;