import React, { useEffect, createContext } from 'react';
import { AppProps } from 'next/app';
import Router from 'next/router';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import NProgress from 'nprogress';

import 'nprogress/nprogress.css';
import '../public/scss/global.scss';

NProgress.configure({
    showSpinner: false,
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ffc93c',
        },
        secondary: {
            main: '#07689f',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
    },
});

export const UserContext = createContext({ isLoggedIn: false });

const MyApp = ({ Component, pageProps }: AppProps) => {
    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');

        if (jssStyles) {
            jssStyles.parentElement!.removeChild(jssStyles);
        }
    }, []);

    return (
        <>
            <ThemeProvider theme={theme}>
                <UserContext.Provider value={{ isLoggedIn: true }}>
                    <CssBaseline />
                    <Component {...pageProps} />
                </UserContext.Provider>
            </ThemeProvider>
        </>
    );
};

export default MyApp;
