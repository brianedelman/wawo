import PropTypes from 'prop-types';
import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Link from 'components/router/Link';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    width: '100%',
  },
  promotion: {
    fontSize: theme.typography.pxToRem(20),
  },
}));

function BusinessPromotion({ content, ...rest }) {
  const classes = useStyles();
  const { business } = rest;

  return (
    <Box className={classes.container}>
      <Grid container>
        <Grid item xs={12} md={9}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography variant="body1" className={classes.promotion}>
              {content.text}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Link
            href={business.businessUrl}
            componentType="button"
            variant="contained"
            color="primary"
            size="large"
          >
            Shop Now
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}

BusinessPromotion.propTypes = {
  content: PropTypes.any.isRequired,
};

export default BusinessPromotion;
