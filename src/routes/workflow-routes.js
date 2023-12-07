const response = require('../utils/response');

const WorkflowMenuItemsModel = require('../models/workflow_menu_items');
const WorkflowNodesModel = require('../models/workflow_nodes');
const WorkflowEdgesModel = require('../models/workflow_edges');
const WorkflowMenuQuestionsModel = require('../models/workflow_menu_questions');

class WorkflowRoutes {
    
	static getRoutes(app, router) {
		router.get('/workflows/menu-items', async (req, res, next) => {
			const data = await WorkflowMenuItemsModel.find();
			response.success(res, data);
		});

		router.get('/workflows/menu-questions', async (req, res, next) => {
			const data = await WorkflowMenuQuestionsModel.find();
			response.success(res, data);
		});

        router.get('/workflows/nodes', async (req, res, next) => {
			const data = await WorkflowNodesModel.find();
			response.success(res, data);
		});
        router.get('/workflows/edges', async (req, res, next) => {
			const data = await WorkflowEdgesModel.find();
			response.success(res, data);
		});
	}
}

module.exports = WorkflowRoutes;
