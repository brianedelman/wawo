/* eslint-disable  max-classes-per-file */
import * as Sentry from '@sentry/node';
import 'util/sentry';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Router from 'next/router';
import { SnackbarProvider } from 'notistack';
import NProgress from 'nprogress';
import { DefaultSeo } from 'next-seo';

import theme from 'theme/theme';
import { CurrentUserProvider } from 'models/user';
import { URLS } from 'constants.js';
import { clientBaseURL } from 'util/axios';
import isServer from 'util/isServer';

import Main from 'components/Main';

NProgress.configure({ parent: '#container' });

Router.events.on('routeChangeStart', url => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

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

  // TODO default seo noIndex property on dev only
  return (
    <>
      <Head>
        {!user ? (
          <link
            rel="preload"
            href={clientBaseURL + URLS.userMe}
            as="fetch"
            crossOrigin="use-credentials"
          />
        ) : null}
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <DefaultSeo
        defaultTitle="We Are Women Owned"
        title="Home"
        titleTemplate="We Are Women Owned | %s"
        openGraph={{
          type: 'website',
          url: 'https://www.wearewomenowned.com/',
          site_name: 'WAWO',
          images: [
            {
              url: 'https://www.wearewomenowned.com/images/wawo.jpg',
              width: '1024',
              height: '683',
              alt: 'We Are Women Owned',
            },
          ],
        }}
        twitter={{
          site: '@weareowmenowned',
          cardType: 'summary_large_image',
        }}
      />
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <SnackbarProvider>
          <CurrentUserProvider initialUser={user}>
            <Main Component={Component} pageProps={pageProps} />
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
