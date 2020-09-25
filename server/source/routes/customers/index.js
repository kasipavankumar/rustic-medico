const { Router } = require('express');
const InsertionController = require('../../controllers/insertion/insertionController');
const QueryController = require('../../controllers/query/queryController');
const Validator = require('../../helpers/validation');
const QueryResource = require('../../utils/constants/queryResources');

const CustomersRouter = Router();
const queryController = new QueryController(QueryResource.Customers);
const insertionController = new InsertionController(QueryResource.Customers);
const validator = new Validator(QueryResource.Customers);

CustomersRouter.get('/get/all', queryController.getAll);
CustomersRouter.get('/get/one', queryController.getOne);

CustomersRouter.post('/add/one', validator.validate, insertionController.insertOne);

module.exports = CustomersRouter;
