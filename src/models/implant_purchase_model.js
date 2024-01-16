const mongoose = require("mongoose");
const { Schema } = mongoose;
const schema = mongoose.Schema({
    "Implant Brand": { type: String },
    "Implant Model": { type: String },
    "Implant Diameter": { type: Schema.Types.Mixed },
    "Implant Platform": { type: Schema.Types.Mixed },
    "Implant Length": { type: String },
    "Implant Surface Treatment": { type: String },
    "Do you need to purchase an implant?": { type: String },
    "Item Name": { type: String },
    "Item Number": { type: String },
    "Link to Purchase": { type: String }
});

const ImplantPurchaseModel = mongoose.model("ImplantPurchase", schema, "ImplantPurchase");

module.exports = ImplantPurchaseModel;
