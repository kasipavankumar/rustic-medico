const { Router } = require('express');
const InsertionController = require('../../controllers/insertion/insertionController');
const QueryController = require('../../controllers/query/queryController');

const CustomersRouter = Router();
const queryController = new QueryController('customers');
const insertionController = new InsertionController('customers');

CustomersRouter.get('/get/all', queryController.getAll);
CustomersRouter.get('/get/one', queryController.getOne);

CustomersRouter.post('/add/one', insertionController.insertOne);

module.exports = CustomersRouter;
