import Link from 'next/link';
import { Layout, SEO } from '../source/components';

export default function Home() {
    return (
        <Layout>
            <SEO title="home" />
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
            <Link href="/employees">
                <a>
                    <h2>Employees</h2>
                </a>
            </Link>
            <Link href="/drugs">
                <a>
                    <h2>Drugs</h2>
                </a>
            </Link>
            <Link href="/customers">
                <a>
                    <h2>Customers</h2>
                </a>
            </Link>
        </Layout>
    );
}
