import { PROPTYPES, BUSINESS_TYPES } from 'constants.js';
import {
  Avatar,
  Box,
  Card,
  CardMedia,
  Typography,
  Tooltip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Link from 'components/router/Link';
import CategoryShortList from 'components/CategoryShortList';

const useStyles = makeStyles(theme => ({
  businessCard: {
    width: '100%',
    height: '100%',
    paddingBottom: theme.spacing(2.5),
    '&:hover': {
      '& .MuiButton-outlined': {
        borderColor: theme.palette.primary.main,
      },
      '& .MuiButton-contained': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.white,
      },
    },
  },
  button: {
    width: '48%',
  },
  media: {
    height: 298,
  },
  avatar: {
    marginTop: '-40px',
    height: '80px',
    width: '80px',
    marginBottom: '3px',
  },
  tooltipTitle: {
    fontSize: theme.typography.pxToRem(14),
    lineHeight: '1.5',
  },
  tooltipSubTitle: {
    fontSize: theme.typography.pxToRem(14),
    color: theme.palette.grey[400],
    lineHeight: '1.2',
  },
  topSection: {
    height: '100%',
  },
  categories: {
    fontSize: theme.typography.pxToRem(12),
  },
}));

function BusinessCard({ business }) {
  const classes = useStyles();

  const { founder, categories } = business;

  const founderName = `${founder.displayFirstName} ${founder.displayLastName}`;

  const renderAvatar = () => (
    <>
      {founder.profileImage ? (
        <Avatar
          className={classes.avatar}
          alt={founderName}
          src={founder.profileImage}
        />
      ) : (
        <Box mb={2} />
      )}
    </>
  );
  return (
    <Card className={classes.businessCard}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        className={classes.topSection}
      >
        <Box>
          <CardMedia
            className={classes.media}
            image={business.mainImage}
            title={`${business.name} main image`}
          />
          <Box flex={1} display="flex" flexDirection="column" mx={2}>
            {founder.displayFounderInformation && founder.profileImage ? (
              <Tooltip
                arrow
                title={
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <Typography
                      variant="overline"
                      className={classes.tooltipTitle}
                    >
                      {founderName}
                    </Typography>
                    {founder.founderTitle && (
                      <Typography
                        variant="overline"
                        className={classes.tooltipSubTitle}
                      >
                        {founder.founderTitle}
                      </Typography>
                    )}
                  </Box>
                }
                placement="right"
              >
                {renderAvatar()}
              </Tooltip>
            ) : (
              <>{renderAvatar()}</>
            )}

            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={2.5}
            >
              <Typography variant="body2">{business.name}</Typography>
              <Typography variant="overline">
                {business.pricePointDisplay}
              </Typography>
            </Box>
            <Typography variant="body1">{business.shortDescription}</Typography>
          </Box>
        </Box>
        <Box px={2}>
          {categories.length > 0 ? (
            <CategoryShortList
              businessType={business.businessType}
              categories={categories}
              className={classes.categories}
            />
          ) : (
            <Box mb={2} />
          )}
          <Box display="flex" justifyContent="space-between">
            <Link
              href={`/directory/${business.slug}/`}
              componentType="button"
              className={classes.button}
              variant="outlined"
            >
              Learn More
            </Link>
            <Link
              href={business.businessUrl}
              className={classes.button}
              componentType="button"
              variant="contained"
              color="secondary"
              target="_blank"
            >
              {business.businessType === BUSINESS_TYPES.product && 'Shop'}
              {business.businessType === BUSINESS_TYPES.service &&
                'See Services'}
              {business.businessType === BUSINESS_TYPES.nonProfit && 'Donate'}
            </Link>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

BusinessCard.propTypes = {
  business: PROPTYPES.business.isRequired,
};

export default BusinessCard;
