import { Layout, LoginForm, SEO } from '../../source/components';

const EmployeeLogin = () => {
    return (
        <Layout>
            <SEO title="Employee Login" />
            <LoginForm formTitle="Employee Login" />
        </Layout>
    );
};

export default EmployeeLogin;
