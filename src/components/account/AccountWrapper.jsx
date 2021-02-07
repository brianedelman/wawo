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
    maxWidth: '480px',
  },
}));

const AccountWrapper = ({ title, children }) => {
  const classes = useStyles();
  return (
    <Container className={classes.paper} component="main" maxWidth="lg">
      <Typography variant="h1">{title}</Typography>
      <hr />
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <AccountSidebar />
        </Grid>

        <Grid item xs={12} md={9}>
          <Box className={classes.wrapper}>{children}</Box>
        </Grid>
      </Grid>
    </Container>
  );
};

AccountWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default AccountWrapper;
