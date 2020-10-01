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

export default WithAuth(Home);
