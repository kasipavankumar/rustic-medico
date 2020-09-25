require('dotenv').config();

const fromEnv = (variable) => process.env[variable];
const isProduction = process.env.NODE_ENV === 'production';

const ADMIN_KEY = fromEnv('ADMIN_KEY') || '$up3r$3cr3tAdm1n';
const DATABASE_URL = isProduction ? fromEnv('DATABASE_URL') : fromEnv('DATABASE_URL_DEV');

if (!ADMIN_KEY) {
    throw new Error('no ADMIN_KEY found in .env');
}

if (!DATABASE_URL) {
    throw new Error('no DATABASE_URL found in .env');
}

module.exports = { DATABASE_URL, ADMIN_KEY };
