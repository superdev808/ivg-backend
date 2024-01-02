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
    "Implant Name": { type: String },
    "Article Number": { type: String },
    "Link to purchase": { type: String }
});

const ImplantPurchaseModel = mongoose.model('ImplantPurchase', schema, "Surgery_ImplantPurchase");

module.exports = ImplantPurchaseModel;
