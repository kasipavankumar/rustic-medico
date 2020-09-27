const isDevelopment = process.env.NODE_ENV !== 'production';

const API_URL_DEVELOPMENT = process.env.NEXT_PUBLIC_API_URL_DEVELOPMENT;
const API_URL_PRODUCTION = process.env.NEXT_PUBLIC_API_URL_PRODUCTION;
export const API_URL = isDevelopment ? API_URL_DEVELOPMENT : API_URL_PRODUCTION;

// Admin Key
export const ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_KEY;
