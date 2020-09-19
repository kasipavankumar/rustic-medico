import { API_URL } from '../source/config';

function Home({ message }) {
    console.log(message);
    return <h1>Hello, world!</h1>;
}

export async function getServerSideProps() {
    const res = await fetch(`${API_URL}/api/admin`);
    const message = await res.json();

    return {
        props: {
            message,
        },
    };
}

export default Home;
