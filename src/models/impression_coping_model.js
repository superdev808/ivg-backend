const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
    "Implant Brand": { type: String },
    "Implant Model": { type: String },
    "Implant Diameter": { type: Schema.Types.Mixed },
    "Implant Platform": { type: Schema.Types.Mixed },
    "Open or Closed Tray": { type: String },
    "Item Name": { type: String },
    "Item Number": { type: String },
    "Link to Purchase": { type: String },
});

const ImpressionCopingModel = mongoose.model("ImpressionCoping", schema, "ImpressionCoping");

module.exports = ImpressionCopingModel;

