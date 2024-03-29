const mongoose = require("mongoose");

const schema = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  calculatorId: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  uploaded: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const UploadProgressModel = mongoose.model(
  "UploadProgress",
  schema,
  "UploadProgress"
);

module.exports = UploadProgressModel;
