import clsx from 'clsx';
import PropTypes from 'prop-types';

import { Grid, Box, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AccountSidebar from 'components/account/AccountSidebar';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  wrapper: {
    paddingLeft: theme.spacing(4),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  contained: {
    maxWidth: '480px',
  },
  sidebarSpacing: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  sidebarRightSpacing: {
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(4),
    },
  },
}));

const AccountWrapper = ({ title, contained, children }) => {
  const classes = useStyles();
  return (
    <Container className={classes.paper} component="main" maxWidth="lg">
      <Grid container spacing={2}>
        <Grid className={classes.sidebarSpacing} item xs={1} />
        <Grid item xs={11} md={9}>
          <Typography className={classes.sidebarRightSpacing} variant="h1">
            {title}
          </Typography>
          <hr />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={1} md={3}>
          <AccountSidebar />
        </Grid>

        <Grid item xs={11} md={9}>
          <Box
            className={clsx(classes.wrapper, contained && classes.contained)}
          >
            {children}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

AccountWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  contained: PropTypes.bool,
};

AccountWrapper.defaultProps = {
  contained: true,
};

export default AccountWrapper;
