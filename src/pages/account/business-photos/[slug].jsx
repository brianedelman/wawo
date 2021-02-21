import { withAuthRequired } from 'util/withAuth';

import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import AccountWrapper from 'components/account/AccountWrapper';
import UserBusinessLinks from 'components/directory/UserBusinessLinks';
// import PhotosForm from 'components/forms/PhotosForm';
import { useCurrentUser } from 'models/user';
import { useBusiness } from 'models/business';

const useStyles = makeStyles(() => ({
  contained: {
    maxWidth: '480px',
  },
  image: {
    width: '100%',
    height: 'auto',
  },
}));

const BusinessPhotos = () => {
  const classes = useStyles();
  const user = useCurrentUser();
  const business = useBusiness();

  if (!business) return <></>;

  return (
    <AccountWrapper contained={false} title="My Business Details">
      <UserBusinessLinks path="/account/business-photos/" user={user} />
      <Typography variant="h4">Business Images</Typography>
      {business.images.length > 0 ? (
        <Grid container spacing={2}>
          {business.images.map(img => (
            <Grid item xs={6} sm={4}>
              <img
                className={classes.image}
                key={img.id}
                src={img.image}
                alt={img.alt}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6">No Images Yet</Typography>
      )}
      <Typography variant="h4">Business Carousel Images</Typography>
      {business.carouselImages.length > 0 ? (
        <Grid container spacing={2}>
          {business.carouselImages.map(img => (
            <Grid item xs={6} sm={4}>
              <img
                className={classes.image}
                key={img.id}
                src={img.image}
                alt={img.alt}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6">No Images Yet</Typography>
      )}

      <Typography variant="h4">Main Image</Typography>
      {business.mainImage ? (
        <Grid container spacing={2}>
          <Grid item xs={6} sm={4}>
            <img
              className={classes.image}
              key={business.mainImage.id}
              src={business.mainImage}
              alt={business.name}
            />
          </Grid>
        </Grid>
      ) : (
        <Typography variant="h6">No Images Yet</Typography>
      )}

      {/* <Box mb={3} className={classes.contained}> */}
      {/* <PhotosForm */}
      {/*   business={business} */}
      {/*   handleBusinessFormSubmit={handleFormSubmit} */}
      {/* /> */}
      {/* </Box> */}
    </AccountWrapper>
  );
};

export default withAuthRequired(BusinessPhotos);
