const { Router } = require('express');
const InsertionController = require('../../controllers/insertion/insertionController');
const QueryController = require('../../controllers/query/queryController');

const DrugsRouter = Router();
const queryController = new QueryController('drugs');
const insertionController = new InsertionController('drugs');

DrugsRouter.get('/get/all', queryController.getAll);
DrugsRouter.get('/get/one', queryController.getOne);

DrugsRouter.post('/add/one', insertionController.insertOne);

module.exports = DrugsRouter;
