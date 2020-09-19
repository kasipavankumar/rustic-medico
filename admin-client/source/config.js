const isDevelopment = process.env.NODE_ENV !== 'production';

const API_URL_DEVELOPMENT = `http://localhost:5000`;
const API_URL_PRODUCTION = `http://localhost:5000`;

export const API_URL = isDevelopment ? API_URL_DEVELOPMENT : API_URL_PRODUCTION;
