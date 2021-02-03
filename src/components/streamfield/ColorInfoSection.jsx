import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Box, Grid, Container, Typography } from '@material-ui/core';
import { Markup } from 'interweave';
import { makeStyles } from '@material-ui/core/styles';
import LinkButton from 'components/streamfield/LinkButton';

const useStyles = makeStyles(theme => ({
  heroText: {
    textAlign: 'center',
  },
  wrapper: {
    backgroundColor: props => props.backgroundColor,
  },
  textWrapper: {
    maxWidth: '80%',
  },
  textButtonWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: `${theme.spacing(6)}px ${theme.spacing(3)}px ${theme.spacing(5)}px`,

    [theme.breakpoints.up('md')]: {
      margin: `${theme.spacing(11)}px ${theme.spacing(6)}px ${theme.spacing(
        10
      )}px`,
    },
  },
  image: props => {
    const style = {
      minHeight: '300px',
      height: '100%',
      backgroundSize: 'cover',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: `url(${props.image.scaledUrl})`,
    };

    const img = props.image;
    if (img.focalPointX) {
      const focusX = (100 * img.focalPointX) / img.width;
      const focusY = (100 * img.focalPointY) / img.height;
      style.backgroundPosition = `${focusX}% ${focusY}%`;
    } else {
      style.backgroundPosition = 'center';
    }

    return style;
  },
}));

const ColorInfoSection = ({ stream }) => {
  const classes = useStyles(stream);

  const { title, text, link, isReversed } = stream;

  return (
    <Box my={7}>
      <Container maxWidth="md">
        {title && (
          <Typography className={classes.heroText} variant="h1">
            {title}
          </Typography>
        )}
      </Container>
      <Box className={classes.wrapper}>
        <Grid container direction={isReversed ? 'row-reverse' : 'row'}>
          <Grid item xs={12} md={5}>
            <Box mb={5} className={clsx(classes.image)} />
          </Grid>
          <Grid item xs={12} md={7}>
            <Box className={classes.textButtonWrapper}>
              <Box className={classes.textWrapper}>
                <Markup content={text} />
              </Box>
              <Box mt={4}>
                <LinkButton stream={link} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
ColorInfoSection.propTypes = {
  stream: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
    link: PropTypes.object,
    image: PropTypes.object.isRequired,
    isReversed: PropTypes.bool.isRequired,
  }).isRequired,
};
export default ColorInfoSection;
