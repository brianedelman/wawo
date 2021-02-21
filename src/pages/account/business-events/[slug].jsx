import { withAuthRequired } from 'util/withAuth';

import { Box, Typography, Grid } from '@material-ui/core';

import AccountWrapper from 'components/account/AccountWrapper';
import UserBusinessLinks from 'components/directory/UserBusinessLinks';
import AccountItemsCard from 'components/account/AccountItemsCard';
import { useCurrentUser } from 'models/user';
import { useBusiness } from 'models/business';

const BusinessEvents = () => {
  const user = useCurrentUser();
  const business = useBusiness();

  if (!business) return <></>;

  return (
    <AccountWrapper contained={false} title="My Business Details">
      <UserBusinessLinks path="/account/business-events/" user={user} />
      <Box mt={3}>
        <Typography variant="h4">Events</Typography>
      </Box>

      {business.events.length > 0 ? (
        <Grid container spacing={2}>
          {business.events.map(ev => (
            <Grid item xs={12} md={5}>
              <AccountItemsCard key={ev.id} item={ev} itemLabel="Event" />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h3">No Events Yet</Typography>
      )}
    </AccountWrapper>
  );
};

export default withAuthRequired(BusinessEvents);
