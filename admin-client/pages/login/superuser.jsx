import { Layout, LoginForm, SEO } from '../../source/components';

const SuperuserLogin = () => {
    return (
        <Layout>
            <SEO title="Superuser Login" />
            <LoginForm formTitle="Superuser Login" />
        </Layout>
    );
};

export default SuperuserLogin;
