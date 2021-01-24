import { PROPTYPES } from 'constants.js';
import { Box, Button, Grid, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';

import Link from 'components/router/Link';
import CategoryShortList from 'components/CategoryShortList';

const useStyles = makeStyles(theme => ({
  title: {
    marginBottom: theme.spacing(3),
  },
  button: {
    marginBottom: theme.spacing(2),
    maxWidth: '180px',
  },
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  categoryList: {
    fontSize: theme.typography.pxToRem(18),
  },
}));

function BusinessInfo({ business }) {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Grid container>
        <Grid item xs={12} md={9}>
          <Typography variant="h1" className={classes.title}>
            {business.name}
          </Typography>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            className={classes.topSection}
          >
            <Box>
              <Box flex={1} display="flex" flexDirection="column" mb={2}>
                <Typography variant="body1" color="textSecondary">
                  Location:
                </Typography>
                {business.location ? (
                  <Typography variant="body2">{business.location}</Typography>
                ) : (
                  <Link href={business.businessUrl}>Online Only</Link>
                )}
              </Box>
              <Box flex={1} display="flex" flexDirection="column" mb={2}>
                <Typography variant="body1" color="textSecondary">
                  Business Type:
                </Typography>
                <Typography variant="body2">{business.businessType}</Typography>
              </Box>
              <Box flex={1} display="flex" flexDirection="column" mb={2}>
                <Typography variant="body1" color="textSecondary">
                  Price Point:
                </Typography>
                <Typography variant="body2">{business.pricePoint}</Typography>
              </Box>
            </Box>
            <Box>
              <Box flex={1} display="flex" flexDirection="column" mb={2}>
                <Typography variant="body1" color="textSecondary">
                  Categories:
                </Typography>
                <CategoryShortList
                  businessType={business.businessType}
                  categories={business.categories}
                  className={classes.categoryList}
                />
              </Box>
              <Box flex={1} display="flex" flexDirection="column" mb={2}>
                <Typography variant="body1" color="textSecondary">
                  Social Media:
                </Typography>

                <Box flex={1} display="flex" flexDirection="row" mb={2}>
                  <>
                    {business.facebook && (
                      <IconButton href={business.facebook}>
                        <FacebookIcon color="secondary" />
                      </IconButton>
                    )}
                    {business.instagram && (
                      <IconButton href={business.instagram}>
                        <InstagramIcon color="secondary" />
                      </IconButton>
                    )}
                    {business.youtube && (
                      <IconButton href={business.youtube}>
                        <YouTubeIcon color="secondary" />
                      </IconButton>
                    )}
                    {business.twitter && (
                      <IconButton href={business.twitter}>
                        <TwitterIcon color="secondary" />
                      </IconButton>
                    )}
                  </>
                </Box>
              </Box>
            </Box>

            <Box px={2} />
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box display="flex" flexDirection="column">
            <Link
              href={business.businessUrl}
              componentType="button"
              className={classes.button}
              variant="contained"
              color="primary"
            >
              Shop Now
            </Link>
            <Button className={classes.button} variant="outlined">
              Share
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

BusinessInfo.propTypes = {
  business: PROPTYPES.business.isRequired,
};

export default BusinessInfo;
