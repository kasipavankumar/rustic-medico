const { Router } = require('express');
const QueryController = require('../../controllers/query/queryController');

const CustomersRouter = Router();
const queryController = new QueryController('customers');

CustomersRouter.get('/get/all', queryController.getAll);
CustomersRouter.get('/get/one', queryController.getOne);

// CustomersRouter.post('/add/one');

module.exports = CustomersRouter;
