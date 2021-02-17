import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { useRouter } from 'next/router';

import { BusinessProvider } from 'models/business';
import { useCurrentUser } from 'models/user';

import Header from 'components/Header';
import Footer from 'components/Footer';

const useStyles = makeStyles({
  Footer: {
    marginTop: 'auto',
  },

  Site: {
    'min-height': '100vh',
  },
});

const Main = props => {
  const { Component, pageProps } = props;
  const user = useCurrentUser();
  const classes = useStyles();
  const router = useRouter();

  const { slug } = router.query;

  return (
    <BusinessProvider slug={slug} user={user}>
      <Box display="flex" flexDirection="column" className={classes.Site}>
        <Header />
        <div id="container">
          <Component {...pageProps} />
        </div>
        <Footer className={classes.Footer} />
      </Box>
    </BusinessProvider>
  );
};

Main.propTypes = {
  Component: PropTypes.elementType.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pageProps: PropTypes.object.isRequired,
};

export default Main;
