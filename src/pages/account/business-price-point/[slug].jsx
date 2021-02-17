import { withAuthRequired } from 'util/withAuth';

import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import AccountWrapper from 'components/account/AccountWrapper';
import UserBusinessLinks from 'components/directory/UserBusinessLinks';
import PricePointForm from 'components/forms/PricePointForm';
import { useCurrentUser } from 'models/user';
import { useBusiness } from 'models/business';

const useStyles = makeStyles(theme => ({
  grid: {
    marginBottom: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  formHeader: {
    fontWeight: 'bold',
  },
  contained: {
    maxWidth: '480px',
  },
}));

const BusinessPricePoint = () => {
  const classes = useStyles();
  const user = useCurrentUser();
  const business = useBusiness();

  if (!business) return <></>;

  // TODO fix other forms as they could work better like this
  const handleFormSubmit = async (values, actions) => {
    // try {
    //   await patchUser(values);
    //   // mutate and don't revalidate
    //   await mutate({ ...user, ...values }, false);
    //   await enqueueSnackbar('Successfully updated profile!', {
    //     variant: 'success',
    //   });
    //   actions.setSubmitting(false);
    // } catch (error) {
    //   actions.setSubmitting(false);
    //   if (error.nonFieldErrors) {
    //     enqueueSnackbar(error.nonFieldErrors, {
    //       variant: 'error',
    //     });
    //   } else {
    //     actions.setErrors(error);
    //   }
    // }

    console.log(values);
    console.log(actions);
  };

  return (
    <AccountWrapper contained={false} title="My Profile">
      <UserBusinessLinks path="/account/business-social/" user={user} />

      <Box mb={3} className={classes.contained}>
        <PricePointForm
          business={business}
          handleBusinessFormSubmit={handleFormSubmit}
        />
      </Box>
    </AccountWrapper>
  );
};

export default withAuthRequired(BusinessPricePoint);
