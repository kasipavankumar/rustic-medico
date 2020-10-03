import { useEffect } from 'react';
import Router from 'next/router';
import useSWR from 'swr';

import { VERIFY_USER } from '../lib/apiEndpoints';

const fetcher = (...args) => fetch(...args, { credentials: 'include' }).then((res) => res.json());

export default function useUser() {
  const swr = useSWR(VERIFY_USER, fetcher);

  useEffect(() => {
    if (swr.data && !swr.data.user) {
      Router.replace('/login');
    }
  }, [swr.data]);

  swr.isLoggedOut = swr.data && !swr.data.user;
  swr.user = swr.data?.user;

  return swr;
}
