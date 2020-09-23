const Pool = require('pg').Pool;
const { DATABASE_URL } = require('../utils/config');

const pool = new Pool({ connectionString: DATABASE_URL });

module.exports = pool;
