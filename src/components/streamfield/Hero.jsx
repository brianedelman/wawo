import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, Container, Typography } from '@material-ui/core';
import { Markup } from 'interweave';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  hero: props => {
    const style = {
      width: '100%',
      height: '400px',
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
  heroText: {
    '& *': {
      color: theme.palette.white,
      textAlign: 'center',
      maxWidth: '700px',
    },
  },
  heightOverride: {
    [theme.breakpoints.up('md')]: {
      minHeight: props => props.heightOverride,
    },
  },
  mobileHeightOverride: {
    [theme.breakpoints.down('sm')]: {
      minHeight: props => props.mobileHeightOverride,
    },
  },
}));

const Hero = ({ stream }) => {
  console.log(stream);
  const classes = useStyles(stream);

  const {
    heightOverride,
    mobileHeightOverride,
    text,
    title,
    contained,
  } = stream;

  return (
    <Container maxWidth={contained ? 'md' : false} disableGutters>
      <Box
        mb={5}
        className={clsx(
          classes.hero,
          heightOverride && classes.heightOverride,
          mobileHeightOverride && classes.mobileHeightOverride
        )}
      >
        {title && (
          <Typography className={classes.heroText} variant="h1">
            {title}
          </Typography>
        )}
        {text && (
          <Box className={classes.heroText}>
            <Markup content={text} />
          </Box>
        )}
      </Box>
    </Container>
  );
};
Hero.propTypes = {
  stream: PropTypes.shape({
    image: PropTypes.object.isRequired,
    heightOverride: PropTypes.number.isRequired,
    mobileHeightOverride: PropTypes.number.isRequired,
    contained: PropTypes.bool.isRequired,
    text: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};
export default Hero;
