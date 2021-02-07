import { withAuthRequired } from 'util/withAuth';
import { Form, Field, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { useSnackbar } from 'notistack';

import { Grid, Button, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import AccountWrapper from 'components/account/AccountWrapper';
import EmailForm from 'components/account/EmailForm';
import {
  updateUser,
  ProfileSchema,
  useCurrentUser,
  useMutateCurrentUser,
} from 'models/user';

const useStyles = makeStyles(theme => ({
  grid: {
    marginBottom: theme.spacing(1),
  },
  bottomSpace: {
    marginBottom: theme.spacing(2),
  },
  formHeader: {
    fontWeight: 'bold',
  },
}));

const EditProfile = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const me = useCurrentUser();
  const mutate = useMutateCurrentUser();

  const handleFormSubmit = (values, actions) => {
    mutate(
      updateUser(values).then(data => data.data),
      false
    )
      .then(response => {
        enqueueSnackbar('Successfully updated profile!', {
          variant: 'success',
        });
        return response;
      })
      .then(response => {
        actions.setSubmitting(false);
        return response;
      })
      .catch(error => {
        actions.setSubmitting(false);
        if (error.nonFieldErrors) {
          enqueueSnackbar(error.nonFieldErrors, {
            variant: 'error',
          });
        } else {
          actions.setErrors(error);
        }
      });
  };

  return (
    <AccountWrapper title="My Profile">
      <Box mb={3}>
        <Formik
          initialValues={{
            firstName: me.firstName,
            lastName: me.lastName,
            email: me.email,
          }}
          className={classes.form}
          validateOnChange
          validationSchema={ProfileSchema}
          onSubmit={handleFormSubmit}
        >
          {({ handleSubmit, isValid, dirty }) => (
            <Form onSubmit={handleSubmit}>
              <Grid container spacing={2} className={classes.grid}>
                <Grid item xs={12}>
                  <Typography className={classes.formHeader}>
                    Personal Info
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={TextField}
                    name="firstName"
                    fullWidth
                    label="First Name"
                    placeholder="Enter First Name"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field
                    name="lastName"
                    fullWidth
                    component={TextField}
                    label="Last Name"
                    placeholder="Enter Last Name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="email"
                    fullWidth
                    component={TextField}
                    label="Email"
                    disabled
                  />
                </Grid>
              </Grid>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                className={classes.bottomSpace}
                disabled={!isValid && dirty}
              >
                Update Personal Info
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
      <EmailForm />
    </AccountWrapper>
  );
};

// EditProfile.getInitialProps = async ctx => {};

export default withAuthRequired(EditProfile);
