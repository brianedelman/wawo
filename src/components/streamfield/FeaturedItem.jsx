import { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, Card, Grid, Typography } from '@material-ui/core';
import { Markup } from 'interweave';
import { makeStyles } from '@material-ui/core/styles';
import LinkButton from 'components/streamfield/LinkButton';

const useStyles = makeStyles(theme => ({
  title: {
    fontWeight: 500,
    color: theme.palette.white,
  },
  text: {
    fontSize: theme.typography.pxToRem(14),
    color: theme.palette.white,
  },
  overlayBox: {
    overflow: 'hidden',
    height: '100%',
    maxHeight: '40%',
    transition: 'max-height 0.1s ease-in',
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundImage:
      'linear-gradient(180deg, rgba(66,66,66,0.005) 10%, rgba(0,0,0,1) 100%)',
  },
  maxHeight: {
    maxHeight: '100%',
  },
  buttonWrapper: {
    display: 'flex',
    flexWrap: 'nowrap',
    '& > *': {
      marginRight: theme.spacing(1),
      marginBottom: 0,
      '& .MuiButtonBase-root': {
        minWidth: '100px',
      },
    },
  },
  box: props => {
    const style = {
      backgroundSize: 'cover',
      height: '300px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
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
  smallText: {
    fontSize: theme.typography.pxToRem(12),
    color: theme.palette.white,
  },
  animatedBox: {
    transition: 'all 0.1s ease-in',
  },
  show: {
    visibility: 'visible',
    opacity: 1,
    maxHeight: '100%',
  },
  hide: {
    visibility: 'hidden',
    opacity: 0,
    maxHeight: 0,
  },
}));

const FeaturedItem = ({ stream }) => {
  const classes = useStyles(stream);
  const [show, setShow] = useState(false);

  const { title, isLarge, links, subTitle, text, titleRight } = stream;

  return (
    <Grid item xs={12} sm={6} md={isLarge ? 8 : 4}>
      <Card onMouseOver={() => setShow(true)} onMouseOut={() => setShow(false)}>
        <Box className={clsx(classes.box, show && classes.maxHeight)}>
          <Box className={clsx(classes.overlayBox, show && classes.maxHeight)}>
            <Box display="flex" justifyContent="space-between" width="100%">
              <Typography className={classes.title} variant="body2">
                {title}
              </Typography>

              {titleRight && (
                <Typography className={classes.text} variant="body1">
                  {titleRight}
                </Typography>
              )}
            </Box>

            {subTitle && (
              <Typography className={classes.smallText} variant="body1">
                {subTitle}
              </Typography>
            )}
            <Box
              className={clsx(
                classes.animatedBox,
                show ? classes.show : classes.hide
              )}
            >
              {text && (
                <Box className={classes.text}>
                  <Markup content={text} />
                </Box>
              )}
              <Box className={classes.buttonWrapper}>
                {links.map((link, idx) => (
                  <LinkButton key={idx} stream={link.value} />
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Card>
    </Grid>
  );
};
FeaturedItem.propTypes = {
  stream: PropTypes.shape({
    image: PropTypes.string.isRequired,
    isLarge: PropTypes.bool.isRequired,
    links: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string,
    text: PropTypes.string.isRequired,
    titleRight: PropTypes.string,
  }).isRequired,
};
export default FeaturedItem;
