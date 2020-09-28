import Link from 'next/link';
import { Layout, SEO } from '../source/components';
import Homepage from '../source/layouts/Homepage';

export default function Home() {
    return (
        <Layout>
            <SEO title="home" />
            <Homepage />
        </Layout>
    );
}
