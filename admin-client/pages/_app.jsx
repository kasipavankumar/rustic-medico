import Head from 'next/head';

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
