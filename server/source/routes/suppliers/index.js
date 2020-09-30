const { Router } = require('express');
const QueryController = require('../../controllers/query/queryController');
const InsertionController = require('../../controllers/insertion/insertionController');
const ManipulationController = require('../../controllers/manipulation/manipulationController');
const DeletionController = require('../../controllers/deletion/deletionController');
const Validator = require('../../helpers/validation');
const QueryResource = require('../../utils/constants/queryResources');

const SuppliersRouter = Router();
const queryController = new QueryController(QueryResource.Suppliers);
const insertionController = new InsertionController(QueryResource.Suppliers);
const manipulationController = new ManipulationController(QueryResource.Suppliers);
const deletionController = new DeletionController(QueryResource.Suppliers);
const validator = new Validator(QueryResource.Suppliers);

SuppliersRouter.get('/get/all', queryController.getAll);
SuppliersRouter.get('/get/one', queryController.getOne);

SuppliersRouter.post('/add/one', validator.validate, insertionController.insertOne);

SuppliersRouter.put('/update/one', validator.validate, manipulationController.updateOne);

SuppliersRouter.delete('/delete/one', deletionController.deleteOne);

module.exports = SuppliersRouter;
