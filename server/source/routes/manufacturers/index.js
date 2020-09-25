const { Router } = require('express');
const QueryController = require('../../controllers/query/queryController');
const InsertionController = require('../../controllers/insertion/insertionController');

const ManufacturersRouter = Router();
const queryController = new QueryController('drug_manufacturers');
const insertionController = new InsertionController('drug_manufacturers');

ManufacturersRouter.get('/get/all', queryController.getAll);
ManufacturersRouter.get('/get/one', queryController.getOne);

ManufacturersRouter.post('/add/one', insertionController.insertOne);

module.exports = ManufacturersRouter;
