const pluralize = require('pluralize');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const queryResourceValid = require('../../helpers/query/queryResourceValidator');
const DatabaseHelpers = require('../database/databaseHelpers');

class Validation {
  constructor(queryResource) {
    if (!queryResourceValid(queryResource)) {
      throw new Error('invalid query resource');
    }

    this.queryResource = queryResource;
  }

  validate = async (req, res, next) => {
    try {
      const singularizedQueryResource = pluralize(this.queryResource, 1);
      const attributesFromClient = req.body[singularizedQueryResource];

      if (!Object.keys(attributesFromClient).length) {
        return res.status(StatusCodes.BAD_REQUEST).json({ err: ReasonPhrases.BAD_REQUEST, msg: 'no attributes specified' });
      }

      const columns = await DatabaseHelpers.getColumnNamesList(this.queryResource);
      const attributesValid =
        req.method === 'POST'
          ? Object.keys(attributesFromClient).every((attribute) => columns.includes(attribute))
          : Object.keys(attributesFromClient).some((attribute) => columns.includes(attribute));

      if (!attributesValid) {
        return res.status(StatusCodes.BAD_REQUEST).json({ err: ReasonPhrases.BAD_REQUEST, msg: 'invalid attributes' });
      }

      next();
    } catch (err) {
      console.error(err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
  };
}

module.exports = Validation;
