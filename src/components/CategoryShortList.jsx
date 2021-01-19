import PropTypes from 'prop-types';
import { PROPTYPES } from 'constants.js';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  category: {
    fontSize: theme.typography.pxToRem(12),
  },
}));

function CategoryShortList({ categories, businessType }) {
  const classes = useStyles();

  // TODO make linkable
  return (
    <>
      {categories.length > 0 && (
        <Box flex={1} mb={1}>
          {businessType && (
            <Typography
              component="span"
              className={classes.category}
              color="textSecondary"
            >
              {businessType}
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
              {cat.name}
              {idx < categories.length - 1 && ' | '}
            </Typography>
          ))}
        </Box>
      )}
    </>
  );
}

CategoryShortList.propTypes = {
  categories: PropTypes.arrayOf(PROPTYPES.category).isRequired,
  businessType: PropTypes.string,
};

CategoryShortList.defaultProps = {
  businessType: null,
};

export default CategoryShortList;
