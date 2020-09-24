const { Router } = require('express');
const DrugsCreationManager = require('../../controllers/drugs/drugsCreationManager');
const QueryController = require('../../controllers/query/queryController');

const DrugsRouter = Router();
const drugsCreationManager = new DrugsCreationManager();
const queryController = new QueryController('drugs');

DrugsRouter.get('/get/all', queryController.getAll);
DrugsRouter.get('/get/one', queryController.getOne);

DrugsRouter.post('/add/one', drugsCreationManager.addDrug);

module.exports = DrugsRouter;
