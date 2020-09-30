require('dotenv').config();

const fromEnv = (variable) => process.env[variable];
const isProduction = process.env.NODE_ENV === 'production';

const ADMIN_KEY = fromEnv('ADMIN_KEY');
const DATABASE_URL = isProduction ? fromEnv('DATABASE_URL') : fromEnv('DATABASE_URL_DEV');
const JWT_SECRET = fromEnv('JWT_SECRET');

if (!ADMIN_KEY) {
  throw new Error('ADMIN_KEY not found in .env');
}

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL not found in .env');
}

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET not found in .env');
}

module.exports = { DATABASE_URL, ADMIN_KEY, JWT_SECRET };
