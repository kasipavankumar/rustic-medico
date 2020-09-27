import Link from 'next/link';
// import { API_URL } from '../source/config';
import Layout from '../source/components/Layout';

function Home() {
    return (
        <Layout>
            <Link href="/login/employee">
                <a>
                    <h2>Employee Login</h2>
                </a>
            </Link>
            <Link href="/login/superuser">
                <a>
                    <h2>Superuser Login</h2>
                </a>
            </Link>
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
