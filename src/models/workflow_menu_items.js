const mongoose = require("mongoose");

const workflowMenuItemsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  value: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  type: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: Number,
    required: true,
  },
  hierarchy: {
    type: [String],
    required: true,
  },
});

const WorkflowMenuItemsModel = mongoose.model(
  "WorkflowMenuItems",
  workflowMenuItemsSchema,
  "WorkflowMenuItems"
);

module.exports = WorkflowMenuItemsModel;
