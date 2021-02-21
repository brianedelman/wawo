import { withAuthRequired } from 'util/withAuth';

import { Box, Typography, Grid } from '@material-ui/core';

import AccountWrapper from 'components/account/AccountWrapper';
import UserBusinessLinks from 'components/directory/UserBusinessLinks';
import AccountItemsCard from 'components/account/AccountItemsCard';
import { useCurrentUser } from 'models/user';
import { useBusiness } from 'models/business';

const BusinessTestimonials = () => {
  const user = useCurrentUser();
  const business = useBusiness();

  if (!business) return <></>;

  return (
    <AccountWrapper contained={false} title="My Business Details">
      <UserBusinessLinks path="/account/business-testimonials/" user={user} />
      <Box mt={3}>
        <Typography variant="h4">Testimonials</Typography>
      </Box>

      {business.testimonials.length > 0 ? (
        <Grid container spacing={2}>
          {business.testimonials.map(testimonial => (
            <Grid item xs={12} md={5}>
              <AccountItemsCard
                key={testimonial.id}
                item={testimonial}
                itemLabel="Testimonial"
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h3">No Testimonials Yet</Typography>
      )}
    </AccountWrapper>
  );
};

export default withAuthRequired(BusinessTestimonials);
