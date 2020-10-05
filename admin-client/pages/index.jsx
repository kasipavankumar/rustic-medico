import { Layout, SEO } from '../source/components';
import HomepageLayout from '../source/layouts/Homepage';
import SalesChart from '../source/components/SalesChart';

function Home() {
  return (
    <Layout>
      <SEO title="home" />
      <SalesChart />
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
