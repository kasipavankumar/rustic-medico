// import { API_URL } from '../source/config';
import Layout from '../source/components/Layout';

function Home() {
    return (
        <Layout>
            <a href="/login/employee">
                <h2>Employee Login</h2>
            </a>
            <a href="/login/superuser">
                <h2>Superuser Login</h2>
            </a>
        </Layout>
    );
}

/* export async function getServerSideProps() {
    const res = await fetch(`${API_URL}/api/admin`);
    const message = await res.json();

    return {
        props: {
            message,
        },
    };
} */

export default Home;
