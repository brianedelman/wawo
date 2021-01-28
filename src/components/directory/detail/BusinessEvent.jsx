import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, CardMedia, Card, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Link from 'components/router/Link';

const useStyles = makeStyles(theme => ({
  title: {
    marginBottom: theme.spacing(3),
    textDecoration: 'underline',
  },
  container: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  boxLeft: {
    width: '25%',
    minWidth: '225px',
    marginRight: theme.spacing(3),
  },
  boxRight: {
    width: '65%',
    marginRight: theme.spacing(3),
  },
  media: {
    height: 220,
  },
  absoluteButton: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
  button: {
    width: '100%',
  },
  imageCard: {
    position: 'relative',
  },
  buttonCard: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
  },
}));

function BusinessEvent({ content }) {
  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <Box className={classes.container}>
        <Grid container>
          <Grid item xs={12} md={9}>
            <Typography variant="h4" className={classes.title}>
              {content.name}
            </Typography>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Box className={classes.boxLeft}>
                <Box flex={1} display="flex" flexDirection="column" mb={2}>
                  <Typography variant="body1" color="textSecondary">
                    When:
                  </Typography>
                  <Typography variant="body2">{content.when}</Typography>
                </Box>
                <Box flex={1} display="flex" flexDirection="column" mb={2}>
                  <Typography variant="body1" color="textSecondary">
                    Where:
                  </Typography>
                  <Typography variant="body2">{content.location}</Typography>
                </Box>
              </Box>
              <Box className={classes.boxRight}>
                <Box flex={1} display="flex" flexDirection="column" mb={2}>
                  <Typography variant="body1" color="textSecondary">
                    What:
                  </Typography>
                  <Typography variant="body2">{content.description}</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card
              className={clsx(
                content.image ? classes.imageCard : classes.buttonCard
              )}
              elevation={content.image ? 1 : 0}
            >
              {content.image && (
                <CardMedia
                  className={classes.media}
                  image={content.image}
                  title={`${content.name} event image`}
                />
              )}
              <Link
                href={content.link}
                componentType="button"
                className={clsx(
                  content.image ? classes.absoluteButton : classes.button
                )}
                variant="contained"
                color="secondary"
              >
                Learn More
              </Link>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}

BusinessEvent.propTypes = {
  content: PropTypes.any.isRequired,
};

export default BusinessEvent;
