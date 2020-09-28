const pool = require('../../database');

class InsertionHelpers {
    constructor(queryResource) {
        this.queryResource = queryResource;
    }

    getColumnNames = async () => {
        try {
            const query = `SELECT column_name FROM information_schema.columns WHERE table_name = '${this.queryResource}';`;

            const { rows } = await pool.query(query);
            const columnNames = rows
                .filter((r) => r.column_name !== 'id')
                .map((r) => r.column_name)
                .join(', ');

            return columnNames;
        } catch (err) {
            console.error(err);
        }
    };

    getAttributes = async () => `(${await this.getColumnNames()})`;

    buildParams = (objectWithDetails) => [...Object.keys(objectWithDetails).map((k) => objectWithDetails[k])];

    buildParamPlaceholders = (objectWithDetails) => {
        return Object.keys(objectWithDetails)
            .map((_, i) => {
                const placeholderNumber = i + 1;
                return `\$${placeholderNumber}`;
            })
            .join(', ');
    };

    buildInsertQuery = async (objectWithDetails) => {
        const sortedAttributes = Object.keys(objectWithDetails).sort((a, b) => a.localeCompare(b));
        const paramPlaceholders = this.buildParamPlaceholders(objectWithDetails);
        const params = [...sortedAttributes.map((a) => objectWithDetails[a])];
        const attributes = Object.keys(objectWithDetails)
            .sort((a, b) => a.localeCompare(b))
            .map((a) => a)
            .join(', ');

        return {
            statement: `insert into ${this.queryResource} (${attributes}) values (${paramPlaceholders});`,
            params,
        };
    };
}

module.exports = InsertionHelpers;
