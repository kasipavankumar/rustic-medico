const { Router } = require('express');
const QueryController = require('../../controllers/query/queryController');
const InsertionController = require('../../controllers/insertion/insertionController');
const Validator = require('../../helpers/validation');
const QueryResource = require('../../utils/constants/queryResources');

const ManufacturersRouter = Router();
const queryController = new QueryController(QueryResource.DrugManufacturers);
const insertionController = new InsertionController(QueryResource.DrugManufacturers);
const validator = new Validator(QueryResource.DrugManufacturers);

ManufacturersRouter.get('/get/all', queryController.getAll);
ManufacturersRouter.get('/get/one', queryController.getOne);

ManufacturersRouter.post('/add/one', validator.validate, insertionController.insertOne);

module.exports = ManufacturersRouter;
