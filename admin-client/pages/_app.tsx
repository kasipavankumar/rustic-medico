import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import Router from 'next/router';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import NProgress from 'nprogress';

import { AuthProvider } from '../source/providers/Auth';

import 'nprogress/nprogress.css';

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

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');

    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthProvider>
    </>
  );
};

export default MyApp;
