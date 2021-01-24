import PropTypes from 'prop-types';
import { Box, Card, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  quoteCard: {
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
  },
  attribution: {
    alignSelf: 'flex-end',
  },
}));

function BusinessTestimonial({ content }) {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={4}>
      <Box className={classes.container}>
        <Card className={classes.quoteCard}>
          <Typography variant="body1" color="textSecondary">
            {content.quote}
          </Typography>
          <Box className={classes.attribution}>
            <Box>
              <Typography variant="body1" color="textSecondary">
                {content.personTitle}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" color="textSecondary">
                {content.personName}
              </Typography>
            </Box>
          </Box>
        </Card>
      </Box>
    </Grid>
  );
}

BusinessTestimonial.propTypes = {
  content: PropTypes.any.isRequired,
};

export default BusinessTestimonial;
