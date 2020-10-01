import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { TokenService } from '../../source/services';
import { Layout, LoginForm, SEO } from '../../source/components';

const SuperuserLogin = () => {
  const router = useRouter();

  useEffect(() => {
    /**
     * If user is logged in, redirect to homepage.
     */
    if (TokenService.getCookie('_SID_')) {
      router.replace('/');
    }
  }, []);

  return (
    <Layout>
      <SEO title="Login" emojiFavicon="🔌" />
      <LoginForm formTitle="Superuser Login" />
    </Layout>
  );
};

export default SuperuserLogin;
