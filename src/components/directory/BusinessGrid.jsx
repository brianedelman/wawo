import PropTypes from 'prop-types';
import BusinessCard from 'components/directory/BusinessCard';
import { Grid } from '@material-ui/core';
import EmptyContent from 'components/EmptyContent';

function BusinessGrid({ businesses, clearFilters }) {
  return (
    <Grid container spacing={2}>
      {businesses.length > 0 ? (
        <>
          {businesses.map(business => (
            <Grid key={business.id} item xs={12} md={4}>
              <BusinessCard business={business} />
            </Grid>
          ))}
        </>
      ) : (
        <EmptyContent
          search
          handleClick={clearFilters}
          buttonText="Start Over"
        />
      )}
    </Grid>
  );
}

BusinessGrid.propTypes = {
  // TODO better proptypes
  businesses: PropTypes.array.isRequired,
  clearFilters: PropTypes.func.isRequired,
};

export default BusinessGrid;
