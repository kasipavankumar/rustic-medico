import axios from 'axios';

import TokenService from './tokenService';
import { API_URL } from '../config';

class LoginService {
  constructor(credentials) {
    this.credentials = credentials;
  }

  login = async () => {
    try {
      const response = await axios({
        method: 'POST',
        url: `${API_URL}/api/admin/login`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: this.credentials,
      });

      const tokenService = new TokenService('_SID_', response.data.token);
      tokenService.setCookie();

      return true;
    } catch (err) {
      return false;
    }
  };
}

export default LoginService;
