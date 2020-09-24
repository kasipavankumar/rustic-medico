const { Router } = require('express');
const QueryController = require('../../controllers/query/queryController');

const ManufacturersRouter = Router();
const queryController = new QueryController('drug_manufacturers');

ManufacturersRouter.get('/get/all', queryController.getAll);
ManufacturersRouter.get('/get/one', queryController.getOne);

// ManufacturersRouter.post('/add/one');

module.exports = ManufacturersRouter;
