const { Router } = require('express');
const QueryController = require('../../controllers/query/queryController');
const InsertionController = require('../../controllers/insertion/insertionController');
const ManipulationController = require('../../controllers/manipulation/manipulationController');
const DeletionController = require('../../controllers/deletion/deletionController');
const Validator = require('../../helpers/validation');
const QueryResource = require('../../utils/constants/queryResources');

const EmployeesRouter = Router();
const queryController = new QueryController(QueryResource.Employees);
const insertionController = new InsertionController(QueryResource.Employees);
const manipulationController = new ManipulationController(QueryResource.Employees);
const deletionController = new DeletionController(QueryResource.Employees);
const validator = new Validator(QueryResource.Employees);

EmployeesRouter.get('/get/all', queryController.getAll);
EmployeesRouter.get('/get/one', queryController.getOne);

EmployeesRouter.post('/add/one', validator.validate, insertionController.insertOne);

EmployeesRouter.put('/update/one', validator.validate, manipulationController.updateOne);

EmployeesRouter.delete('/delete/one', deletionController.deleteOne);

module.exports = EmployeesRouter;
