import { Layout, SEO } from '../source/components';
import HomepageLayout from '../source/layouts/Homepage';

function Home() {
  return (
    <Layout>
      <SEO title="home" />
      <HomepageLayout />
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  if (!req?.headers?.cookie) {
    res.writeHead(307, { Location: '/login?redirect=home' });
    res.end();
    return { props: {} };
  }

  return { props: {} };
}

export default Home;
