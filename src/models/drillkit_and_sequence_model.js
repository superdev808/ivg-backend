const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
    "Implant Brand": { type: String },
    "Implant Model": { type: String },
    "Implant Diameter": { type: Schema.Types.Mixed },
    "Implant Platform": { type: Schema.Types.Mixed },
    "Implant Length": { type: String },
    "Implant Surface Treatment": { type: String },
    "Select Drill Kit": { type: String },
    "Implant Drill Kit Name": { type: String },
    "Drill Kit Item Number": { type: String },
    "Link to Drill Kit": { type: String },
    "Drill Sequence": { type: String },
    "Drill 1": { type: String },
    "Drill 1 Item Number": { type: String },
    "Drill 1 Link to Purchase": { type: String },
    "Drill 2": { type: String },
    "Drill 2 Item Number": { type: String },
    "Drill 2 Link to Purchase": { type: String },
    "Drill Sequence Source": { type: String },
});

const DrillKitAndSequenceModel = mongoose.model('DrillKitAndSequence', schema, "Surgery_DrillKitAndSequence");

module.exports = DrillKitAndSequenceModel;
