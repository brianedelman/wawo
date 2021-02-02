import PropTypes from 'prop-types';
import { Box, Grid, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import StreamField from 'components/streamfield/StreamField';

const useStyles = makeStyles(theme => ({
  heroText: {
    textAlign: 'center',
  },
  wrapper: {
    marginBottom: theme.spacing(5),
  },
}));

const FeaturedSection = ({ stream }) => {
  const classes = useStyles();

  const { title, content } = stream;

  return (
    <Container maxWidth="md">
      <Box className={classes.wrapper}>
        {title && (
          <Typography className={classes.heroText} variant="h1">
            {title}
          </Typography>
        )}
        <Grid container spacing={2}>
          <StreamField stream={content} />
        </Grid>
      </Box>
    </Container>
  );
};
FeaturedSection.propTypes = {
  stream: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.any,
  }).isRequired,
};
export default FeaturedSection;
