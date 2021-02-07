import { Form, Field, Formik } from 'formik';
import { useSnackbar } from 'notistack';

import { Typography, Button, Grid } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { makeStyles } from '@material-ui/core/styles';

import { changePass, ChangePassSchema } from 'models/user';
import { withAuthRequired } from 'util/withAuth';
import AccountWrapper from 'components/account/AccountWrapper';

const useStyles = makeStyles(theme => ({
  grid: {
    marginBottom: theme.spacing(1),
  },
  formHeader: {
    fontWeight: 'bold',
  },
}));

const ChangePassword = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const handleFormSubmit = (values, actions) => {
    changePass(values)
      .then(response => {
        enqueueSnackbar('Successfully changed password!', {
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
    <AccountWrapper title="Security and Privacy">
      <Formik
        initialValues={{
          currentPassword: '',
          newPassword: '',
          reNewPassword: '',
        }}
        className={classes.form}
        validateOnChange
        validationSchema={ChangePassSchema}
        onSubmit={handleFormSubmit}
      >
        {({ handleSubmit, isValid, dirty }) => (
          <Form onSubmit={handleSubmit}>
            <Grid container spacing={2} className={classes.grid}>
              <Grid item xs={12}>
                <Typography className={classes.formHeader}>Password</Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Field
                  fullWidth
                  component={TextField}
                  name="currentPassword"
                  autoComplete="current-password"
                  label="Current Password"
                  type="password"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Field
                  fullWidth
                  name="newPassword"
                  component={TextField}
                  autoComplete="new-password"
                  type="password"
                  label="New password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  fullWidth
                  name="reNewPassword"
                  component={TextField}
                  type="password"
                  autoComplete="new-password"
                  label="Repeat New password"
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!isValid && dirty}
            >
              Update Password
            </Button>
          </Form>
        )}
      </Formik>
    </AccountWrapper>
  );
};
export default withAuthRequired(ChangePassword);
