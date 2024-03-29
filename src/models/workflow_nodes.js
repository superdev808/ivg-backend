const mongoose = require("mongoose");

const workflowNodesSchema = mongoose.Schema({
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

const WorkflowNodesModel = mongoose.model(
  "WorkflowNodes",
  workflowNodesSchema,
  "WorkflowNodes"
);

module.exports = WorkflowNodesModel;
