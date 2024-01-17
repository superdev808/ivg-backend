const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
    "Implant Brand": { type: String },
    "Implant Model": { type: String },
    "Implant Diameter": { type: Schema.Types.Mixed },
    "Implant Platform": { type: Schema.Types.Mixed },
    "Implant Length": { type: String },
    "Drill Kit Type": { type: String },
    "Drill Kit Name": { type: String },
    "Drill Kit Item Number": { type: String },
    "Drill Kit Link to Purchase": { type: String },
    "Drill 1 Name": { type: String },
    "Drill 1 Item Number": { type: String },
    "Drill 1 Link to Purchase": { type: String },
    "Manufacturer Recommendations": { type: String },
    "Drill 2 Name": { type: String },
    "Drill 2 Item Number": { type: String },
    "Drill 2 Link to Purchase": { type: String },
    "Drill 3 Name": { type: String },
    "Drill 3 Item Number": { type: String },
    "Drill 3 Link to Purchase": { type: String },
    "Drill 4 Name": { type: String },
    "Drill 4 Item Number": { type: String },
    "Drill 4 Link to Purchase": { type: String },
    "Drill 5 Name": { type: String },
    "Drill 5 Item Number": { type: String },
    "Drill 5 Link to Purchase": { type: String },
    "Drill 6 Name": { type: String },
    "Drill 6 Item Number": { type: String },
    "Drill 6 Link to Purchase": { type: String },
    "Drill 7 Name": { type: String },
    "Drill 7 item Number": { type: String },
    "Drill 7 Link to Purchase": { type: String },
    "Drill 8 Name": { type: String },
    "Drill 8 item Number": { type: String },
    "Drill 8 Link to Purchase": { type: String },
    "Drill 9 Name": { type: String },
    "Drill 9 item Number": { type: String },
    "Drill 9 Link to Purchase": { type: String }
});

const DrillKitAndSequenceModel = mongoose.model('DrillKitAndSequence', schema, "Surgery_DrillKitAndSequence");

module.exports = DrillKitAndSequenceModel;
