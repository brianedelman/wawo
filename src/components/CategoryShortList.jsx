import PropTypes from 'prop-types';
import { PROPTYPES } from 'constants.js';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'components/router/Link';

const useStyles = makeStyles(theme => ({
  category: {
    fontSize: 'inherit',
  },
  categoryLink: {
    fontSize: 'inherit',
    color: theme.palette.text.secondary,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));

function CategoryShortList({ categories, businessType, className }) {
  const classes = useStyles();

  return (
    <Box className={className}>
      {categories.length > 0 && (
        <Box flex={1} mb={1}>
          {businessType && (
            <Typography
              component="span"
              className={classes.category}
              color="textSecondary"
            >
              <Link
                className={classes.categoryLink}
                href={{
                  pathname: '/directory/businesses',
                  query: { type: businessType },
                }}
              >
                {businessType}
              </Link>
              {categories.length > 0 && ' | '}
            </Typography>
          )}
          {categories.map((cat, idx) => (
            <Typography
              component="span"
              className={classes.category}
              color="textSecondary"
              key={cat.slug}
            >
              <Link
                className={classes.categoryLink}
                href={{
                  pathname: '/directory/businesses',
                  query: { category: cat.name },
                }}
              >
                {cat.name}
              </Link>
              {idx < categories.length - 1 && ' | '}
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
}

CategoryShortList.propTypes = {
  categories: PropTypes.arrayOf(PROPTYPES.category).isRequired,
  businessType: PropTypes.string,
  className: PropTypes.string,
};

CategoryShortList.defaultProps = {
  businessType: null,
  className: null,
};

export default CategoryShortList;
