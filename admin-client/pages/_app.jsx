import Head from 'next/head';
import '../public/scss/global.scss';

const MyApp = ({ Component, pageProps }) => {
    return (
        <>
            <Head>
                <title>Rustic Medico</title>
            </Head>
            <Component {...pageProps} />
        </>
    );
};

export default MyApp;
