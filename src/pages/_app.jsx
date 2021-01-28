/* eslint-disable  max-classes-per-file */
import * as Sentry from '@sentry/node';
import 'util/sentry';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, Box } from '@material-ui/core';
import Router from 'next/router';
import { SnackbarProvider } from 'notistack';
import NProgress from 'nprogress';

import theme from 'theme/theme';
import { CurrentUserProvider, USER_ME } from 'models/user';
import { clientBaseURL } from 'util/axios';
import isServer from 'util/isServer';

import Header from 'components/Header';
import Footer from 'components/Footer';

NProgress.configure({ parent: '#container' });

Router.events.on('routeChangeStart', url => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const useStyles = makeStyles({
  Footer: {
    marginTop: 'auto',
  },

  Site: {
    'min-height': '100vh',
  },
});

const debugForceIP = () => {
  if (
    process.env.NEXT_PUBLIC_DEBUG &&
    !isServer() &&
    window.location.hostname === 'localhost'
  ) {
    window.location = `http://127.0.0.1:3000${window.location.pathname}`;
  }
};

const fileLabel = 'pages/_app';
export default function App(props) {
  debugForceIP();
  const { Component, pageProps } = props;
  const classes = useStyles();

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const { user } = pageProps;
  Sentry.addBreadcrumb({
    // See https://docs.sentry.io/enriching-error-data/breadcrumbs
    category: fileLabel,
    message: `Preparing app (${isServer() ? 'server' : 'browser'})`,
    level: Sentry.Severity.Debug,
  });

  return (
    <>
      <Head>
        <title>Lightmatter!</title>
        {!user ? (
          <link
            rel="preload"
            href={clientBaseURL + USER_ME}
            as="fetch"
            crossOrigin="use-credentials"
          />
        ) : null}
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <SnackbarProvider>
          <CurrentUserProvider initialUser={user}>
            <Box display="flex" flexDirection="column" className={classes.Site}>
              <Header />
              <div id="container">
                <Component {...pageProps} />
              </div>
              <Footer className={classes.Footer} />
            </Box>
          </CurrentUserProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pageProps: PropTypes.object.isRequired,
};
