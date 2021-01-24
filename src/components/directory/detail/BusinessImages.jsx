import { useState } from 'react';
import clsx from 'clsx';
import { PROPTYPES } from 'constants.js';
import { Button, Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  image: {
    width: '100%',
    height: 'auto',
  },
  smallImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  button: {
    height: '200px',
    padding: '1px',
    '& .MuiButton-label': {
      height: '100%',
    },
  },
  active: {
    border: `2px solid ${theme.palette.salmon}`,
  },
}));

function BusinessImages({ business }) {
  const classes = useStyles();

  const [selectedImage, setSelectedImage] = useState(business.images[0]);

  return (
    <Box className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <img
            className={classes.image}
            src={selectedImage.image}
            alt={business.name}
          />
        </Grid>
        <Grid container item xs={12} md={6} spacing={2}>
          {business.images.map((image, idx) => (
            <Grid container item xs={12} md={4} key={idx}>
              <Button
                className={clsx(
                  classes.button,
                  selectedImage.id === image.id && classes.active
                )}
                disableElevation
                disableRipple
                onClick={() => setSelectedImage(image)}
              >
                <img
                  className={classes.smallImage}
                  src={image.image}
                  alt={business.name}
                />
              </Button>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}

BusinessImages.propTypes = {
  business: PROPTYPES.business.isRequired,
};

export default BusinessImages;
