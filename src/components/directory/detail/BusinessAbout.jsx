import { useState } from 'react';
import clsx from 'clsx';
import { PROPTYPES } from 'constants.js';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'components/router/Link';

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
    height: '150px',
    padding: '1px',
    '& .MuiButton-label': {
      height: '100%',
    },
  },
  active: {
    border: `2px solid ${theme.palette.salmon}`,
  },
}));

function BusinessAbout({ business }) {
  const classes = useStyles();

  const [selectedImage, setSelectedImage] = useState(business.images[0]);
  const description = business.description.split('\n');

  return (
    <Box className={classes.container}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <img
            className={classes.image}
            src={selectedImage.image}
            alt={business.name}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h3">About {business.name}</Typography>
          {description.map((desc, idx) => (
            <Typography paragraph variant="body1" key={idx}>
              {desc}
            </Typography>
          ))}
          <Box width="100%" display="flex" justifyContent="center" mt={6}>
            <Link
              href={business.businessUrl}
              componentType="button"
              variant="contained"
              color="primary"
              target="_blank"
              size="large"
            >
              Shop Now
            </Link>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {business.images.map((image, idx) => (
          <Grid container item xs={12} md={2} key={idx}>
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

      <Box />
    </Box>
  );
}

BusinessAbout.propTypes = {
  business: PROPTYPES.business.isRequired,
};

export default BusinessAbout;
