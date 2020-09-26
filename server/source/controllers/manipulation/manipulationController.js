const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const pluralize = require('pluralize');
const DatabaseHelpers = require('../../helpers/database/databaseHelpers');
const queryResourceValid = require('../../helpers/query/queryResourceValidator');
const pool = require('../../database');

class ManipulationController {
    constructor(queryResource) {
        if (!queryResourceValid(queryResource)) {
            throw new Error('invalid query resource');
        }

        this.queryResource = queryResource;
    }

    updateOne = async (req, res) => {
        try {
            // TODO: Clean up & remove duplicated code.
            const singularizedResourceName = pluralize(this.queryResource, 1);
            const attributesFromClient = req.body[singularizedResourceName];
            const { id } = attributesFromClient;

            if (!id) {
                return res.status(StatusCodes.BAD_REQUEST).json({ err: ReasonPhrases.BAD_REQUEST, msg: 'id is required' });
            }

            const attributesPlaceholders = Object.keys(attributesFromClient)
                .filter((a) => a !== 'id')
                .map((a, i) => `${a} = \$${i + 1}`)
                .join(', ');

            const updateQuery = `update ${this.queryResource} set ${attributesPlaceholders} where id = '${id}';`;

            const params = [
                ...Object.keys(attributesFromClient)
                    .filter((a) => a !== 'id')
                    .map((a) => attributesFromClient[a]),
            ];

            const result = await pool.query(updateQuery, params);

            console.log(result);

            if (result.rowCount === 0) {
                return res.status(StatusCodes.BAD_REQUEST).json({ err: ReasonPhrases.BAD_REQUEST, msg: 'could not update' });
            }

            return res.status(StatusCodes.OK).json({ msg: 'updated record successfully' });
        } catch (err) {
            console.error(err);

            if (err.code === '22P02') {
                return res.status(StatusCodes.BAD_REQUEST).json({ err: ReasonPhrases.BAD_REQUEST, msg: 'invalid product id' });
            }

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    };
}

module.exports = ManipulationController;
