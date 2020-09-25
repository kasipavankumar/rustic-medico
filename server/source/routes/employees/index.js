const { Router } = require('express');
const QueryController = require('../../controllers/query/queryController');
const InsertionController = require('../../controllers/insertion/insertionController');

const EmployeesRouter = Router();
const queryController = new QueryController('employees');
const insertionController = new InsertionController('employees');

EmployeesRouter.get('/get/all', queryController.getAll);
EmployeesRouter.get('/get/one', queryController.getOne);

EmployeesRouter.post('/add/one', insertionController.insertOne);

module.exports = EmployeesRouter;
