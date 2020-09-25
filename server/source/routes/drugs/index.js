const { Router } = require('express');
const InsertionController = require('../../controllers/insertion/insertionController');
const QueryController = require('../../controllers/query/queryController');
const DeletionController = require('../../controllers/deletion/deletionController');
const Validator = require('../../helpers/validation');
const QueryResource = require('../../utils/constants/queryResources');

const DrugsRouter = Router();
const queryController = new QueryController(QueryResource.Drugs);
const insertionController = new InsertionController(QueryResource.Drugs);
const deletionController = new DeletionController(QueryResource.Drugs);
const validator = new Validator(QueryResource.Drugs);

DrugsRouter.get('/get/all', queryController.getAll);
DrugsRouter.get('/get/one', queryController.getOne);

DrugsRouter.post('/add/one', validator.validate, insertionController.insertOne);

DrugsRouter.delete('/delete/one', deletionController.deleteOne);

module.exports = DrugsRouter;
