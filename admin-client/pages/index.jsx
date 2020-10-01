import { Layout, SEO } from '../source/components';
import HomepageLayout from '../source/layouts/Homepage';
import WithAuth from '../source/components/WithAuth';

function Home() {
  return (
    <Layout>
      <SEO title="home" />
      <HomepageLayout />
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  // Redirect to login if not authenticated.
  if (!req?.headers?.cookie) {
    res.writeHead(307, { Location: '/login' });
    res.end();
    return { props: {} };
  }

  return { props: {} };
}

export default Home;
