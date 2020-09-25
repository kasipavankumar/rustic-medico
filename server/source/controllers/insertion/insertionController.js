const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const pluralize = require('pluralize');
const queryResourceValid = require('../../helpers/query/queryResourceValidator');
const InsertionHelpers = require('../../helpers/insertion/insertionHelpers');
const pool = require('../../database');

class InsertionController {
    constructor(queryResource) {
        if (!queryResourceValid(queryResource)) {
            throw new Error('invalid query resource');
        }

        this.queryResource = queryResource;
        this.helper = new InsertionHelpers(queryResource);
    }

    insertOne = async (req, res) => {
        try {
            const singularQuerySourceName = pluralize(this.queryResource, 1);
            const queryResourceDetail = req.body[singularQuerySourceName];
            const { statement, params } = await this.helper.buildInsertQuery(queryResourceDetail);

            const result = await pool.query(statement, params);

            if (result.rowCount !== 1) {
                res.status(StatusCodes.BAD_REQUEST).json({ msg: `cannot insert ${singularQuerySourceName}` });
            }

            res.status(StatusCodes.OK).json({ msg: `inserted ${singularQuerySourceName}` });
        } catch (err) {
            console.error(err);

            if (err.code === '23505') {
                return res.status(StatusCodes.BAD_REQUEST).json({ err: ReasonPhrases.BAD_REQUEST, msg: 'record already exists' });
            }

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    };
}

module.exports = InsertionController;
