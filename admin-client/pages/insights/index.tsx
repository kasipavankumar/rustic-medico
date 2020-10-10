import Axios from 'axios';
import React, { useEffect } from 'react';
import { ADMIN_KEY, API_URL } from 'source/config';

export default function Insights() {
  useEffect(() => {
    Axios.get(`${API_URL}/api/analytics/page-views`, {
      headers: {
        'Content-Type': 'application/json',
        'Admin-Key': ADMIN_KEY,
        Accept: 'application/json',
      },
    })
      .then(console.log)
      .catch(console.error);
  }, []);

  return <>Insights</>;
}
