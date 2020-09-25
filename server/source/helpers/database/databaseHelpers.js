const pool = require('../../database');

class DatabaseHelpers {
    static getColumnNamesList = async (tableName) => {
        try {
            const query = `SELECT column_name FROM information_schema.columns WHERE table_name = '${tableName}';`;

            const { rows } = await pool.query(query);
            return rows.filter((r) => r.column_name !== 'id').map((r) => r.column_name);
        } catch (err) {
            console.error(err);
        }
    };
}

module.exports = DatabaseHelpers;
