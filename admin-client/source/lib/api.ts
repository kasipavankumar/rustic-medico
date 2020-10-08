import Axios from 'axios';
import { ADMIN_KEY, API_URL } from 'source/config';

const api = Axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Admin-Key': ADMIN_KEY,
  },
  withCredentials: true,
});

export default api;
