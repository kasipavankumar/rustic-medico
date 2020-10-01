import axios from 'axios';
import Router from 'next/router';
import { API_URL } from '../config';

class FetchService {
  constructor(entity) {
    this.entity = entity;
  }

  fetch = async (ctx) => {
    try {
      const cookie = ctx.req?.headers?.cookie.split('=')[1];

      const response = await axios({
        method: 'GET',
        url: `${API_URL}/api/admin/${this.entity}/get/all`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${cookie}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 401 && !ctx.req) {
        Router.push('/login');
        return {};
      }

      if (response.status === 401 && ctx.req) {
        ctx.res?.writeHead(302, {
          Location: '/login',
        });

        ctx.res?.end();
        return;
      }

      return { data: response.data };
    } catch (err) {
      console.error(err);
      return { err };
    }
  };
}

export default FetchService;
