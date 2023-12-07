const mongoose = require('mongoose');

const workflowMenuQuestionsSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	value: {
		type: String,
		required: true,
	},
	hierarchy: {
		type: [String],
	},
});

const WorkflowMenuQuestionsModel = mongoose.model('WorkflowMenuQuestions', workflowMenuQuestionsSchema, 'WorkflowMenuQuestions');

module.exports = WorkflowMenuQuestionsModel;