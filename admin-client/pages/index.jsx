// import { API_URL } from '../source/config';
import { Heading } from 'evergreen-ui';

function Home() {
    return <Heading size={900}>Hello, world!</Heading>;
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
