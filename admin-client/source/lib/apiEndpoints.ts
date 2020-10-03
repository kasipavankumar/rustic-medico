import { API_URL } from '../config';

const buildAPIEndpoint = (suffix: string) => `${API_URL}/api/${suffix}`;

export const VERIFY_USER = buildAPIEndpoint('verify-auth');
