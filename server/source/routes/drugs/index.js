const { Router } = require('express');
const DrugsCreationManager = require('../../controllers/drugs/drugsCreationManager');
const DrugsQueryManager = require('../../controllers/drugs/drugsQueryManager');

const DrugsRouter = Router();
const drugsQueryManager = new DrugsQueryManager();
const drugsCreationManager = new DrugsCreationManager();

DrugsRouter.get('/get/all', drugsQueryManager.getAllDrugs);
DrugsRouter.get('/get/one', drugsQueryManager.getOneDrug);

DrugsRouter.post('/add/one', drugsCreationManager.addDrug);

module.exports = DrugsRouter;
