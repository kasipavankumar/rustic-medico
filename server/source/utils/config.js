require('dotenv').config();

const fromEnv = (variable) => process.env[variable];
const isProduction = process.env.NODE_ENV === 'production';

const ADMIN_KEY = fromEnv('ADMIN_KEY') || '$up3r$3cr3tAdm1n';
const DATABASE_URL = isProduction ? fromEnv('DATABASE_URL') : fromEnv('DATABASE_URL_DEV');

module.exports = { DATABASE_URL, ADMIN_KEY };
