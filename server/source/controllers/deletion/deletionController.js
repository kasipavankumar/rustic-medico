const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const pool = require('../../database');
const queryResourceValid = require('../../helpers/query/queryResourceValidator');

class DeletionController {
    constructor(queryResource) {
        if (!queryResourceValid(queryResource)) {
            throw new Error('invalid query resource');
        }

        this.queryResource = queryResource;
    }

    deleteOne = async (req, res) => {
        try {
            const { name, id } = req.query;

            if (name) return this.deleteOneByName(res, name);
            if (id) return this.deleteOneById(res, id);

            return res.status(404).end();
        } catch (err) {
            console.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    };

    deleteOneByName = async (res, name) => {
        try {
            const query = `delete from ${this.queryResource} where name = $1;`;
            const params = [name];

            const result = await pool.query(query, params);

            if (result.rowCount === 0) {
                return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'record does not exist' });
            }

            if (result.rowCount !== 1) {
                return res.status(StatusCodes.BAD_REQUEST).json({ err: ReasonPhrases.BAD_REQUEST, msg: 'could not delete record' });
            }

            return res.status(StatusCodes.OK).json({ msg: `record deleted` });
        } catch (err) {
            console.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    };

    deleteOneById = async (res, id) => {
        try {
            const query = `delete from ${this.queryResource} where id = $1;`;
            const params = [id];

            const result = await pool.query(query, params);

            console.log(result);

            if (result.rowCount === 0) {
                return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'record does not exist' });
            }

            if (result.rowCount !== 1) {
                return res.status(StatusCodes.BAD_REQUEST).json({ err: ReasonPhrases.BAD_REQUEST, msg: `could not delete record` });
            }

            return res.status(StatusCodes.OK).json({ msg: `record deleted` });
        } catch (err) {
            console.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    };
}

module.exports = DeletionController;
