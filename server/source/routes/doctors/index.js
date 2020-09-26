const { Router } = require('express');
const QueryController = require('../../controllers/query/queryController');
const DeletionController = require('../../controllers/deletion/deletionController');
const ManipulationController = require('../../controllers/manipulation/manipulationController');
const InsertionController = require('../../controllers/insertion/insertionController');
const Validator = require('../../helpers/validation');
const QueryResource = require('../../utils/constants/queryResources');

const DoctorsRouter = Router();
const queryController = new QueryController(QueryResource.Doctors);
const insertionController = new InsertionController(QueryResource.Doctors);
const manipulationController = new ManipulationController(QueryResource.Doctors);
const deletionController = new DeletionController(QueryResource.Doctors);
const validator = new Validator(QueryResource.Doctors);

DoctorsRouter.get('/get/all', queryController.getAll);
DoctorsRouter.get('/get/one', queryController.getOne);

DoctorsRouter.post('/add/one', validator.validate, insertionController.insertOne);

DoctorsRouter.put('/update/one', validator.validate, manipulationController.updateOne);

DoctorsRouter.delete('/delete/one', deletionController.deleteOne);

module.exports = DoctorsRouter;
