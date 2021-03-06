import { withAuthRequired } from 'util/withAuth';

import { Box, Typography, Grid } from '@material-ui/core';

import AccountWrapper from 'components/account/AccountWrapper';
import UserBusinessLinks from 'components/directory/UserBusinessLinks';
import AccountItemsCard from 'components/account/AccountItemsCard';
import { useCurrentUser } from 'models/user';
import { useBusiness } from 'models/business';

const BusinessPromotions = () => {
  const user = useCurrentUser();
  const business = useBusiness();

  if (!business) return <></>;

  return (
    <AccountWrapper contained={false} title="My Business Details">
      <UserBusinessLinks path="/account/business-promotions/" user={user} />
      <Box mt={3}>
        <Typography variant="h4">Promotions</Typography>
      </Box>

      {business.promotions.length > 0 ? (
        <Grid container spacing={2}>
          {business.promotions.map(promotion => (
            <Grid item xs={12} md={5}>
              <AccountItemsCard
                key={promotion.id}
                item={promotion}
                itemLabel="Promotion"
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h3">No Promotions Yet</Typography>
      )}
    </AccountWrapper>
  );
};

export default withAuthRequired(BusinessPromotions);
