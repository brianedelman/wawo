import axios from 'util/axios';
import useSWR from 'swr';
import { PROPTYPES, URLS } from 'constants.js';
import { Box, Grid } from '@material-ui/core';
import BusinessCard from 'components/directory/BusinessCard';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

function FoundedBusinesses({ business }) {
  const classes = useStyles();

  const { data } = useSWR(
    URLS.api.directory,
    query =>
      axios({
        method: 'get',
        url: query,
        params: {
          founder: business.founder.id,
        },
      }).then(response => response.data),
    {
      revalidateOnFocus: false,
    }
  );

  if (!data) return <></>;
  const businesses = data.results;

  return (
    <Box className={classes.container}>
      <Grid container spacing={2}>
        {businesses.map(
          biz =>
            biz.id !== business.id && (
              <Grid key={biz.id} item xs={12} md={4}>
                <BusinessCard business={biz} />
              </Grid>
            )
        )}
      </Grid>
    </Box>
  );
}

FoundedBusinesses.propTypes = {
  business: PROPTYPES.business.isRequired,
};

export default FoundedBusinesses;
