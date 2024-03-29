const mongoose = require("mongoose");

const workflowEdgesSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  value: {
    type: String,
    required: true,
  },
  flowId: {
    type: String,
    required: true,
  },
  type: {
    type: Number,
    required: true,
  },
  start: {
    type: Boolean,
  },
});

const WorkflowEdgesModel = mongoose.model(
  "WorkflowEdges",
  workflowEdgesSchema,
  "WorkflowEdges"
);

module.exports = WorkflowEdgesModel;
