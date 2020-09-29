import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from './_app';
import { Layout, SEO } from '../source/components';
import HomepageLayout from '../source/layouts/Homepage';

export default function Home() {
    const user = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
        if (!user.isLoggedIn) {
            router.push('/login/superuser', '/login/superuser?redirect=home');
        }
    }, [user.isLoggedIn]);

    return (
        <Layout>
            <SEO title="home" />
            <HomepageLayout />
        </Layout>
    );
}
