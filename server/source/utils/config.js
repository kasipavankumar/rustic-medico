require('dotenv').config();

const fromEnv = (variable) => process.env[variable];
const isProduction = process.env.NODE_ENV === 'production';

const DATABASE_URL = isProduction
    ? fromEnv('DATABASE_URL')
    : fromEnv('DATABASE_URL_DEV');

module.exports = { DATABASE_URL };
