const { Router } = require('express');
const QueryController = require('../../controllers/query/queryController');

const EmployeesRouter = Router();
const queryController = new QueryController('employees');

EmployeesRouter.get('/get/all', queryController.getAll);
EmployeesRouter.get('/get/one', queryController.getOne);

// EmployeesRouter.post('/add/one');

module.exports = EmployeesRouter;
