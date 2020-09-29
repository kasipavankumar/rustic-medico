const { StatusCodes, ReasonPhrases } = require('http-status-codes');
// const queryResourceValid = require('../../helpers/queryResourceValidator');
const queryResourceValid = require('../../helpers/query/queryResourceValidator');
const pool = require('../../database');

class QueryController {
    /**
     * QueryController
     * @param {string} queryResource Resource to be queried.
     */
    constructor(queryResource) {
        this.queryResource = queryResource;

        if (!queryResourceValid(this.queryResource)) {
            throw new Error('invalid query resource');
        }
    }

    /**
     * Query database for all records for given queryResource.
     * @async
     * @param {Request} req
     * @param {Response} res
     */
    getAll = async (req, res) => {
        try {
            const dbQuery = `select * from ${this.queryResource} order by updated_at desc;`;

            const { rows } = await pool.query(dbQuery);

            if (!rows) {
                return res.status(StatusCodes.BAD_REQUEST).json({ err: ReasonPhrases.BAD_REQUEST, msg: 'no records found' });
            }

            return res.status(StatusCodes.OK).json({ [this.queryResource]: rows });
        } catch (err) {
            console.error(err);

            // Table doesn't exist
            if (err.code === '42P01') {
                return res.status(StatusCodes.BAD_REQUEST).json({ err: ReasonPhrases.BAD_REQUEST, msg: 'query resource does not exists' });
            }

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    };

    /**
     * Query database for one particular record.
     * @param {Request} req
     * @param {Response} res
     */
    getOne = async (req, res) => {
        try {
            const { id, name } = req.query;

            if (id) return this.getOneById(res, id);
            if (name) return this.getOneByName(res, name);

            return res.status(StatusCodes.NOT_FOUND).end();
        } catch (err) {
            console.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    };

    /**
     * Query database for record by id.
     * @async
     * @param {Response} res
     * @param {string} id
     */
    getOneById = async (res, id) => {
        try {
            const dbQuery = `select * from ${this.queryResource} where id = $1;`;
            const params = [id];

            const { rows } = await pool.query(dbQuery, params);

            if (!rows) {
                return res.status(StatusCodes.BAD_REQUEST).json({ err: ReasonPhrases.BAD_REQUEST, msg: 'no records found' });
            }

            return res.status(StatusCodes.OK).json({ [this.queryResource]: rows });
        } catch (err) {
            console.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    };

    /**
     * Query database for record by name.
     * @async
     * @param {Response} res
     * @param {string} name
     */
    getOneByName = async (res, name) => {
        try {
            const dbQuery = `select * from ${this.queryResource} where name = $1;`;
            const params = [name];

            const { rows } = await pool.query(dbQuery, params);

            if (!rows) {
                return res.status(StatusCodes.BAD_REQUEST).json({ err: ReasonPhrases.BAD_REQUEST, msg: 'no records found' });
            }

            return res.status(StatusCodes.OK).json({ [this.queryResource]: rows });
        } catch (err) {
            console.error(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    };
}

module.exports = QueryController;
